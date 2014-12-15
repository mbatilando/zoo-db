from bs4 import BeautifulSoup
from random import randint
from urllib import urlopen

def random_digits(length):
  result = ""
  for i in range(length):
    result += str(randint(0, 9))
  return result

def random_phone_number():
  return "(%s) %s-%s" % (random_digits(3), random_digits(3), random_digits(4))

content = ("INSERT INTO \"Zoo Customers\" " +
    "(id, first_name, last_name, phone) VALUES\n")
key = 1000

for tr in BeautifulSoup(urlopen("customers.html").read()).findAll("tr")[1:]:
  first_name, last_name = (str(td.text) for td in tr.findAll("td"))
  content += ("  (%d, '%s', '%s', '%s'),\n"
      % (key, first_name, last_name, random_phone_number()))
  key += 1

content = content[:-2] + ";\n"

sql_file = open("customers.sql", "w")
sql_file.write(content)
sql_file.close()

