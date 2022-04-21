# Step 2 in text prediction
# Can be called from main.py

# Takes 2D list, text; and degree (number of words in dictionary key).
# Outer list element is sentence, inner list element is words inside sentence (commas included?)
#
# Returns a dictionary of list of tuples  (sorted by frequency):
# { key (phrase of degree words) :  [ (next_word1, prob1) , (next_word2, prob2), ...}}
def list_to_markov(text, degree):
    # Builds nested dictionary of probabilities
    prob_dict = freq_to_prob(build_freq_dict(text, degree))

    # Convert inner dictionary to list of tuples (to be sorted by probability)
    for phrase in prob_dict:
        prob_list = list(prob_dict[phrase].items())

        # Sorts prob_list by probability in descending order
        prob_dict[phrase] = sorted(prob_list, key=lambda x: (-x[1], [0]))

    return prob_dict


# Converts freq_dict into prob dic
def freq_to_prob(dict):
    for phrase in dict:
        total = count_next_word_freq(dict[phrase])

        for next_word in dict[phrase]:
            dict[phrase][next_word] = dict[phrase][next_word] / total

    return dict


# Sums all frequencies of next_words for a given dictionary associated with a phrase
def count_next_word_freq(next_word_dict):
    sum = 0
    for k in next_word_dict:
        sum += next_word_dict[k]

    return sum

# Returns a dictionary of dictionaries :
# { key (phrase of degree words) :  { next_word1: prob1 , next_word2: prob2, ...}}
def build_freq_dict(text, degree):
    freq_dict = {}

    for sentence in text:
        for j in range(len(sentence)):

            # If there there are enough words in the sentence for a key and value (following word) to be gathered
            if j + degree < len(sentence):

                # combines degree words into a phrase with spaces between
                phrase = ' '.join(sentence[j:j + degree])
                next_word = sentence[j + degree]
                update_dict(freq_dict, phrase, next_word)

    return freq_dict


# if key exits then adds value to a list of values for that key; otherwise creates a new entry
def update_dict(freq_dict, phrase, next_word):

    # If phrase is already in dict
    if phrase in freq_dict:

        # next_word is already in next_words dict
        if next_word in freq_dict[phrase]:
            freq = freq_dict[phrase][next_word] + 1
            freq_dict[phrase][next_word] = freq

        # next word is not already in inner dict
        else:
            freq_dict[phrase][next_word] = 1

    # phrase is not in dict
    else:
        freq_dict[phrase] = {next_word : 1}


