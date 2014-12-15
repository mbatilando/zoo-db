from imgurpython import ImgurClient
import json, os

ANIMALS_FILE = "animals.sql"

def get_id(line):
  return int(line[line.index("(") + 1 : line.index(",")])

def get_starting_key():
  key = 1000
  if os.path.exists(ANIMALS_FILE):
    sql_file = open(ANIMALS_FILE)
    key = get_id(sql_file.readlines()[-1]) + 1
    sql_file.close()
  return key

def get_exhibit_species_data():
  sql_file = open("exhibits.json")
  data = json.load(sql_file)
  sql_file.close()
  return data

def make_name_id_map(filename, starting_line, name_index):
  sql_file = open(filename)
  name_id_map = {}
  for line in sql_file.readlines()[starting_line:]:
    name = line.split(",")[name_index].strip(" '").decode("utf-8")
    name_id_map[name] = get_id(line)
  sql_file.close()
  return name_id_map

def get_animal_info(species_name, animal_number, key, imgur_client):
  given_name = raw_input(
      "\nEnter a name for %s #%d: " % (species_name, animal_number))
  gender_input = raw_input("What is %s's gender (m/f)? " % given_name)
  gender = "male" if (gender_input == "m") else "female"
  birth_date = raw_input("When was %s born (YYYY-MM-DD)? " % given_name)
  weight = float(raw_input("How much does %s weigh (lbs)? " % given_name))
  picture_url_input = raw_input(
      "Enter the url for a picture of %s: " % given_name)
  picture_url = imgur_client.upload_from_url(picture_url_input)["link"]
  return (key, given_name, weight, picture_url,
      birth_date, gender, exhibit_id, species_id)

def write_animal_info(animal_info):
  sql_file = open(ANIMALS_FILE, "a")
  sql_file.write("INSERT INTO \"Animals\" VALUES" +
      "(%d, '%s', %.2f, '%s', '%s', '%s', %d, %d);\n" % animal_info)
  sql_file.close()

key = get_starting_key()
exhibit_species_data = get_exhibit_species_data()

exhibit_map = make_name_id_map("exhibits.sql", 1, 1)
species_map = make_name_id_map("species.sql", 0, 2)

imgur_client_id = '1e4a7fb7c1e792e'
imgur_client_secret = '955f6c253125431e6648e482a16d83c0faa59218'
imgur_client = ImgurClient(imgur_client_id, imgur_client_secret)

for exhibit_name in exhibit_species_data:
  exhibit_id = exhibit_map[exhibit_name]
  for species_name in exhibit_species_data[exhibit_name]:
    species_id = species_map[species_name]
    print "\nFound species '%s' in exhibit '%s'." % (species_name, exhibit_name)
    num_animals = int(raw_input(
      "How many '%s' animals do you want to add? " % species_name))
    for i in range(num_animals):
      animal_info = get_animal_info(species_name, i + 1, key, imgur_client)
      write_animal_info(animal_info)
      print "Added %s the %s." % (animal_info[1], species_name)
      key += 1

