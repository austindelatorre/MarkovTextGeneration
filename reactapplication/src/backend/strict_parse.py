from bs4 import BeautifulSoup
import requests
import re

def get_text(url):
    total = 0
    accept = 0
    text_matrix = []
    output_matrix = []
    html = requests.get(url).text
    soup = BeautifulSoup(html, 'html.parser')
    paragraphs = soup.findAll('p')
    for paragraph in paragraphs:
        search = paragraph.text
        search = re.sub(r"[^a-zA-Z0-9,;.!?\'\"\s-]", "", paragraph.text) 
        search = re.sub(r"[;]", ".", search) 
        sentences = re.findall(r'[A-Z][A-Za-z\s,;\"\'-]{20,300}[.|!|?]', search)
        for element in sentences:
            temp = re.sub(r"[.!?]", "", element) 
            temp = temp.lower()
            accept += len(temp.split())
            text_matrix.append(temp.split())
        total += len(paragraph.text.split())
    print("STRICT PARSE: parsed source with accept rate of: ", accept/total)
    return text_matrix