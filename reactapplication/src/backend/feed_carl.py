import parse
import strict_parse
import list_to_markov as markov
import to_json as json
import os

#Loops through the links in "urls" txt file and writes their prob_dicts to our json file

def feed():
    with open("urls.txt", "r") as url_file:
        text = []
        for line in url_file:
            line = line.rstrip('\r\n')
            print("*** Eating from: ", line)
            new_text = strict_parse.get_text(line)
            text += new_text
        
        print("*** Done Eating. Digesting into probibility JASON.")
        json.write(markov.list_to_markov(text, 3), "dict")

        print("CARL IS FED")
        file_size = os.path.getsize('dict.json')
        print("File Size of dict.json is :", file_size/1000000, "mb")

if __name__ == "__main__":
    feed()