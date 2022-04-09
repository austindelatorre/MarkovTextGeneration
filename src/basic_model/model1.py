import re
import random
import sys

def strip_and_sort(file):
    with open(file) as f:
        lines = f.readlines()
        text = ""
        for line in lines:
            for char in line.upper():
                if char in "QWERTYUIOPASDFGHJKLZXCVBNM:,. ":
                    text += char
        sentences = re.split(",|:", text)
        for i, s in enumerate(sentences):
        	sentences[i] = s.replace('.', '')
        phrases = [re.split(" ", sent) for sent in sentences]
        text = text.replace(";", "").replace(",", "").replace(".", "")
        words = set(re.findall("([A-Z]*) ", text))
        words.remove('')
        for i, p in enumerate(phrases):
        	if '' in p:
        		phrases[i].remove('')
    return phrases, words

def frequency(phrases, words):
    freq = dict()
    for word in words:
        np1_list = []
        for phrase in phrases:
            if word in phrase:
                occ = phrase.count(word)
                for i in range(1, occ + 1):
                    try:
                        word_i = phrase.index(word, i)
                    except:
                        word_i = phrase.index(word)
                    if word_i + 1 <= len(phrase) - 1:
                        np1_list.append(phrase[word_i + 1])
        freq[word] = np1_list
    return freq

def predict(text, freq, n = 10):
    if n == 0:
        return text
    prob = freq[text.split(' ')[-1]]
    if len(prob) == 0:
        return
    new = random.choice(prob)
    return predict(text + " " + new, freq, n -1)

phrases, words = strip_and_sort("sample.txt") 
freq = frequency(phrases, words)

def main():
	print(sys.argv[1].upper())
	for i in range(100):
		print(predict(sys.argv[1].upper(), freq, 5))

if __name__ == '__main__':
	main()


