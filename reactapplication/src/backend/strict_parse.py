from bs4 import BeautifulSoup
import requests
import re

def get_text(url):
    text_matrix = []
    output_matrix = []
    html = requests.get(url).text
    soup = BeautifulSoup(html, 'html.parser')
    paragraphs = soup.findAll('p')
    for paragraph in paragraphs:
        sentences = re.findall(r'[A-Z][a-z\s,]{20,300}[.|!|?]', paragraph.text)
        for element in sentences:
            temp = element.replace(".", "").lower()
            text_matrix.append(temp.split())
    return text_matrix