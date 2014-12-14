from random import randint

def get_customer_id(line):
  if "INSERT" in line:
    return None
  else:
    return int(line[line.index("(") + 1 : line.index(",")])

def get_random_date():
  return "%d-%d-%d" % (randint(2015, 2020), randint(1, 12), randint(1, 28))

content = ("INSERT INTO \"ZooMemberships\" " +
    "(id, membership_expiration, \"Zoo CustomerId\", \"ZooId\") VALUES\n")

key = 1000
zoo_id = 1000

customer_file = open("customers.sql")

for line in customer_file.readlines()[1:]:
  content += ("  (%d, '%s', %d, %d),\n" %
      (key, get_random_date(), get_customer_id(line), zoo_id))
  key += 1

customer_file.close()

content = content[:-2] + ";\n"

sql_file = open("memberships.sql", "w")
sql_file.write(content)
sql_file.close()

