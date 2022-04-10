import list_to_markov as markov
import pprint


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

    # Text is a 2D list. Outerlist is sentences, inner list is words within sentence
    text = fake_text()   # Insert Dylan's function here

    # Temporary
    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(markov.list_to_markov(text, 1))


if __name__ == "__main__":
    main()