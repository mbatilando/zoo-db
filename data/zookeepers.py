from bs4 import BeautifulSoup
from random import randint, random
from urllib import urlopen

FIRST_NAME = "first_name"
LAST_NAME = "last_name"

def get_zookeeper_data(url):
  soup = BeautifulSoup(urlopen(url).read())
  attrs = {"class": "CenturyGothic-Bold"}
  return [str(span.text) for span in soup.findAll("span", attrs)[1:]]

def get_zookeeper_names(url):
  names = []
  for name in get_zookeeper_data(url):
    if "," in name:
      name = name[:name.index(",")]
    split_names = name.split()
    names.append({FIRST_NAME: split_names[0], LAST_NAME: split_names[-1]})
  return names

def random_digits(length):
  result = ""
  for i in range(length):
    result += str(randint(0, 9))
  return result

def random_phone_number():
  return "(%s) %s-%s" % (random_digits(3), random_digits(3), random_digits(4))

def random_work_days():
  work_days = ""
  count = 0
  for day in ["M", "Tu", "W", "Th", "F", "Sa", "Su"]:
    if (random() < 0.33):
      work_days += day + " "
      count += 1
  if (count < 2) or (count > 4):
    return random_work_days()
  else:
    return work_days.strip()

url = "http://zoo.sandiegozoo.org/content/key-leaders"
content = ("INSERT INTO \"Zookeepers\" " +
    "(id, first_name, last_name, phone, work_days, \"ZooId\") VALUES\n")

key = 1000
ZooId = 0

for name in get_zookeeper_names(url):
  content += ("  (%d, '%s', '%s', '%s', '%s', %d),\n" %
      (key, name[FIRST_NAME], name[LAST_NAME],
          random_phone_number(), random_work_days(), ZooId))
  key += 1

content = content[:-2] + ";\n"

sql_file = open("zookeepers.sql", "w")
sql_file.write(content)
sql_file.close()

