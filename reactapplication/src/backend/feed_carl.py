import parse
import list_to_markov as markov
import to_json as json

#Loops through the links in "urls" txt file and writes their prob_dicts to our json file

def feed():
    with open("urls.txt", "r") as file:
        text = []
        for line in file:
            line = line.rstrip('\r\n')
            new_text = parse.get_text(line)
            print(new_text[0])
            text += new_text
           #  json.write(markov.list_to_markov(parse.get_text(line), 2))
        json.write(markov.list_to_markov(text, 5), "dict")
