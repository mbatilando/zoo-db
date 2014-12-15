import json, random

exhibits_file = open("exhibits.json")
exhibit_names = json.load(exhibits_file).keys()
exhibits_file.close()

zookeeper_file = open("zookeepers.sql")
zookeeper_ids = []

for line in zookeeper_file.readlines()[1:]:
  zookeeper_ids.append(int(line[line.index("(") + 1 : line.index(",")]))

zookeeper_file.close()

content = "INSERT INTO \"Exhibits\" (id, name, \"ZookeeperId\") VALUES\n"
key = 1000

for name in exhibit_names:
  content += "  (%d, '%s', %d),\n" % (key, name, random.choice(zookeeper_ids))
  key += 1

content = content[:-2] + ";\n"

sql_file = open("exhibits.sql", "w")
sql_file.write(content)
sql_file.close()

