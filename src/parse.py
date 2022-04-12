from bs4 import BeautifulSoup
import requests
import re


# Takes a url and returns the webpage's tokenized text using beautifulsoup.
# Cleans the text using regexp (removes numbers, equations, punctuation, and lowercases every string).
# -- I'm sure the data cleaning can be improved
# Does not comb through multiple pages yet.
def get_text(url):
    text_matrix = []
    output_matrix = []
    html = requests.get(url).text
    soup = BeautifulSoup(html, 'html.parser')
    paragraphs = soup.findAll('p')
    for paragraph in paragraphs:
        clean_string = re.sub(r'(\$+)(?:(?!\1)[\s\S])*\1', '', paragraph.text)
        clean_string = re.sub('[^A-Za-z0-9. ]+', '', clean_string)
        clean_string = re.sub(r'\w*\d\w*', '', clean_string).strip()
        clean_string = clean_string.replace("i.e.", "")
        clean_string = clean_string.lower()
        sentence_list = [sentence for sentence in clean_string.split('.')]
        for element in sentence_list:
            text_matrix.append(element)
    for sentence in text_matrix:
        words = sentence.split()
        output_matrix.append(words)
    for element in output_matrix:
        if len(element) < 2:
            output_matrix.remove(element)
    return output_matrix


get_text('https://www.mctague.org/carl/blog/')
