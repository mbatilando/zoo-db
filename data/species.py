from bs4 import BeautifulSoup
from urllib import urlopen

def make_soup(url):
  return BeautifulSoup(urlopen(url).read())

def get_species_links(url):
  soup = make_soup(url)
  attrs = {"class": "views-field-field-animals-thumbnail"}
  return [span.find("a").get("href") for span in soup.findAll("span", attrs)]

def parse_species_page(url):
  soup = make_soup(url)
  species_info = {}
  panel_info = {}
  populate_panel_info(soup, "mini-panel-scientific_classification", panel_info)
  populate_panel_info(soup, "mini-panel-quick_facts", panel_info)
  common_name = soup.find("span", {"class": "titleAnimal"}).text
  if (("'" not in common_name) and ("genus" in panel_info) and ("species" in panel_info)
      and panel_info["genus"].isalpha() and panel_info["species"].isalpha()):
    species_info["common_name"] = common_name
    species_info["scientific_name"] = "%s %s" % (panel_info["genus"], panel_info["species"])
    species_info["description"] = soup.find("div", {"class": "collapse-text-text"}).find("p").text.strip()
  return species_info

def populate_panel_info(soup, panel_id, panel_info):
  for div in soup.find("div", {"id": panel_id}).findAll("div", {"class": "field-item"}):
    key = div.find("div", {"class": "double-field-first"}).text.strip().lower()[:-1]
    if key not in panel_info:
      panel_info[key] = div.find("div", {"class": "double-field-second"}).text.strip()

url = "http://animals.sandiegozoo.org"
content = "INSERT INTO Species (id, scientific_name, common_name, description) VALUES\n"
key = 1000

for link in get_species_links(url + "/animals-a-z"):
  species_info = parse_species_page(url + link)
  if species_info:
    common_name = species_info["common_name"]
    print common_name
    content += ("  (%d, '%s', '%s', '%s'),\n" %
        (key, species_info["scientific_name"], common_name, species_info["description"].replace("'", "")))
    key += 1

content = content[:-2] + ";"

sql_file = open("species.sql", "w")
sql_file.write(content.encode("utf-8"))
sql_file.close()

