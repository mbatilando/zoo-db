from bs4 import BeautifulSoup
from random import randint
from urllib import urlopen

FIRST = "first_name"
LAST = "last_name"

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
    names.append({FIRST: split_names[0], LAST: split_names[-1]})
  return names

def random_digits(length):
  result = ""
  for i in range(length):
    result += str(randint(0, 9))
  return result

def random_phone_number():
  return "(%s) %s-%s" % (random_digits(3), random_digits(3), random_digits(4))

url = "http://zoo.sandiegozoo.org/content/key-leaders"
content = ("INSERT INTO \"Zookeepers\" " +
    "(id, first_name, last_name, phone_number, work_days, ZooId) VALUES\n")
key = 1000

work_days = "null"
ZooId = 0

for name in get_zookeeper_names(url):
  content += ("  (%d, '%s', '%s', '%s', %s, %d),\n" %
      (key, name[FIRST], name[LAST], random_phone_number(), work_days, ZooId))
  key += 1

content = content[:-2] + ";\n"

sql_file = open("zookeepers.sql", "w")
sql_file.write(content)
sql_file.close()

