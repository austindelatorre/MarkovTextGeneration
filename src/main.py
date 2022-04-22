import list_to_markov as markov
import pprint
import parse
from to_json import write
from feed_carl import feed


# Delete
def fake_text():
    text = [["Hello", "here", "was", "text"],
            ["Hello", "here", "was", "text"],
            ["here", "is", "the", "text"],
            ["the", "bird", "is", "nice"],
            ["the", "bird", "is", "nice"],
            ["Here", "was", "the", "bird", "which", "is", "very", "nice"],
            ["Here", "is", "my", "bird", "which", "was", "very", "nice"],
            ["Here", "is", "the", "bird", "which", "was", "very", "nice"],
            ["Here", "is", "my", "dog", "which", "is", "nice,", "and", "I", "like", "it"]

            ]

    return text


def main():
    pp = pprint.PrettyPrinter(indent=4)
   #  text = parse.get_text("https://en.wikipedia.org/wiki/Pierogi")
    # pp.pprint(text)

    # Text is a 2D list. Outerlist is sentences, inner list is words within sentence
    # text = fake_text()   # Insert Dylan's function here

    # Temporary
   # dict_list = markov.list_to_markov(text, 3)
   # write(dict_list, "test")

    # Continue testing
    feed()

if __name__ == "__main__":
    main()