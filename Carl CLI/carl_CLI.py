import json 
import os
import sys


def carl_loop():
	def print_results(phrase, results, n = 10):
		print(str(len(results)) + " Results for '" + phrase + "':")
		for i, r in enumerate(results):
			print(" - " + str(round(r[1], 4)) + "\t" + r[0])
			if i == n - 1:
				if len(results) > n:
					print("...")
				break

	print("-"*15)
	print("Welcome to CARL - Computer Assisted Real Language")
	print("-"*15)

	dict_path = "dict.json"
	f = open(dict_path)
	data = json.load(f)

	print("Using", dict_path, "as data source.")
	print("Data source size:", os.path.getsize('dict.json')/1000000, "MB")

	while True:
		usr_input = input("CARL >>> ")
		
		if usr_input == "END":
			break
		usr_input = usr_input.lower()
		component = list(reversed(usr_input.split()))

		l = len(component)

		for i in range(1, l+1):
			word = ""
			for p in range(0, i):
				word = component[p] + " " + word
			word = word[:-1]
			try:
				results = data[word]
				print_results(word, results)
			except:
				if word not in data and word != " ":
					print("'" + word + "'", " is not in dictionary")

		print("\n")


if __name__ == "__main__":
    carl_loop()