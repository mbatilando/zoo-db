from bs4 import BeautifulSoup
from urllib import urlopen
import os

NAMES_FILE = "species.csv"

def make_soup(url):
  return BeautifulSoup(urlopen(url).read())

def get_species_links(url):
  soup = make_soup(url)
  attrs = {"class": "views-field-field-animals-thumbnail"}
  return [span.find("a").get("href") for span in soup.findAll("span", attrs)]

def parse_species_page(url, names):
  soup = make_soup(url)
  species_info = {}
  panel_info = {}
  populate_panel_info(soup, "mini-panel-scientific_classification", panel_info)
  populate_panel_info(soup, "mini-panel-quick_facts", panel_info)
  common_name = soup.find("span", {"class": "titleAnimal"}).text
  species_info["common_name"] = common_name
  species_info["scientific_name"] = (
      names[common_name] if (common_name in names) else
      get_scientific_name(common_name, panel_info))
  species_info["description"] = soup.find(
      "div", {"class": "collapse-text-text"}).find("p").text.strip()
  return species_info

def populate_panel_info(soup, panel_id, panel_info):
  for div in soup.find(
      "div", {"id": panel_id}).findAll("div", {"class": "field-item"}):
    key = div.find(
        "div", {"class": "double-field-first"}).text.strip().lower()[:-1]
    if key not in panel_info:
      panel_info[key] = div.find(
          "div", {"class": "double-field-second"}).text.strip()

def get_scientific_name(common_name, panel_info):
  if (("genus" in panel_info) and ("species" in panel_info)
      and panel_info["genus"].isalpha() and panel_info["species"].isalpha()):
    scientific_name = "%s %s" % (panel_info["genus"], panel_info["species"])
  else:
    scientific_name = raw_input(
        "Enter the scientific name for '%s': " % common_name)
  write_name(common_name, scientific_name)
  return scientific_name

def read_names():
  names = {}
  if os.path.exists(NAMES_FILE):
    names_file = open(NAMES_FILE)
    for line in names_file:
      common_name, scientific_name = line.strip().split(",")
      names[common_name] = scientific_name
  return names

def write_name(common_name, scientific_name):
  names_file = open(NAMES_FILE, "a")
  names_file.write(("%s,%s\n" % (common_name, scientific_name)).encode("utf-8"))
  names_file.close()

url = "http://animals.sandiegozoo.org"
content = ""
key = 1000

names = read_names()
links = get_species_links(url + "/animals-a-z")

for link in links:
  species_info = parse_species_page(url + link, names)
  if species_info:
    common_name = species_info["common_name"]
    print "Found '%s'." % common_name
    content += ("INSERT INTO \"Species\" VALUES(%d, '%s', '%s', '%s');\n" %
        (key, species_info["scientific_name"], common_name,
            species_info["description"].replace("'", "''")))
    key += 1

sql_file = open("species.sql", "w")
sql_file.write(content.encode("utf-8"))
sql_file.close()

