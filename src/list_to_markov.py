# Step 2 in text prediction
# Can be called from main.py

# Takes 2D list, text; and degree (number of words in dictionary key). Outer list element is sentence, inner list element is words inside sentence (commas included?)
# Returns a dictionary of dictionaries : { key (phrase of degree words) :  { next_word1: prob1 , next_word2: prob2, ...}}
def list_to_markov(text, degree):
    return freq_to_prob(build_freq_dict(text, degree))


def freq_to_prob(freq_dict):



# Returns a dictionary of dictionaries : { key (phrase of degree words) :  { next_word1: prob1 , next_word2: prob2, ...}}
def build_freq_dict(text, degree):
    freq_dict = {}

    for sentence in text:
        for j in len(sentence):

            # If there there are enough words in the sentence for a key and value (following word) to be gathered
            if j + degree < len(sentence):

                # combines degree words into a phrase with spaces between
                phrase = ' '.sentence[j:j + degree]
                next_word = sentence[j + degree]
                update_dict(freq_dict, phrase, next_word)



# if key exits then adds value to a list of values for that key; otherwise creates a new entry
def update_dict(freq_dict, phrase, next_word):
    freq = 1

    # If phrase is already in dict and next_word is already in next_words dict
    if phrase in freq_dict and next_word in freq_dict[phrase]:

