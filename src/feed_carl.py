import parse
import list_to_markov as markov
import to_json as json

#Loops through the links in "carl_urls" txt file and writes their prob_dicts to our json file

def feed():
    with open("carl_urls.txt", "r") as file:
        for line in file:
            json.write(markov.list_to_markov(parse.get_text(line), 2))
