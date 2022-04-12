import json

#takes output of list_to_markov(text) and dumps it to "carl_json" file

def write(prob_dict):
    carl_json = open("carl_json", "w")
    json.dump(prob_dict, carl_json)
    carl_json.close()

