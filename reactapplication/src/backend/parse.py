from bs4 import BeautifulSoup
import requests
import re


# Takes a url and returns the webpage's tokenized text using beautifulsoup.
# Cleans the text using regexp (removes numbers, equations, special symbols, and lowercases every string).
# -- I'm sure the data cleaning can be improved
# Does not comb through multiple pages yet.
def get_text(url):
    text_matrix = []
    output_matrix = []
    html = requests.get(url).text
    soup = BeautifulSoup(html, 'html.parser')
    paragraphs = soup.findAll('p')
    for paragraph in paragraphs:
        clean_string = re.sub(r"(\$+)(?:(?!\1)[\s\S])*\1|[^A-Za-z0-9 .-]+", '', paragraph.text)  # special characters
        # clean_string = re.sub(r'\w*\d\w*', '', clean_string).strip() -- numbers
        clean_string = clean_string.replace("i.e.", "")  # removes i.e.
        clean_string = clean_string.lower()  # lowercases string
        sentence_list = [sentence for sentence in clean_string.split('. ')]  # splits into list of sentences
        for element in sentence_list:
            text_matrix.append(element)
    for sentence in text_matrix:
        words = sentence.split()  # splits each sentence into a list of words
        output_matrix.append(words)  # appends to one big master list
    for element in output_matrix:
        if len(element) < 2:
            output_matrix.remove(element)
    return output_matrix


get_text('https://www.mctague.org/carl/blog/')
