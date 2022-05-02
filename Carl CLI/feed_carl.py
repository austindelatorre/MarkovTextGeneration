import parse
import strict_parse
import list_to_markov as markov
import to_json as json
import os
import sys

#Loops through the links in "urls" txt file and writes their prob_dicts to our json file

def feed():
    url_path = "urls.txt"
    name = "dict.json"
    print("Creating file: ", name)
    print("Using URLs form: ", url_path)
    with open(url_path, "r") as url_file:
        text = []
        for line in url_file:
            line = line.rstrip('\r\n')
            print("*** Eating from: ", line)
            new_text = strict_parse.get_text(line)
            text += new_text
        
        print("*** Done Eating. Digesting into probibility JSON.")
        json.write(markov.list_to_markov(text, 4), "dict")

        print("CARL IS FED")
        file_size = os.path.getsize('dict.json')
        print("File Size of dict.json is :", file_size/1000000, "mb")

if __name__ == "__main__":
    feed()