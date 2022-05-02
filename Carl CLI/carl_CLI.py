import json 

def print_results(phrase, results, n = 10):
	print(str(len(results)) + " Results for '" + phrase + "':")
	for i, r in enumerate(results):
		print(" - " + str(round(r[1], 4)) + "\t" + r[0])
		if i == n - 1:
			if len(results) > n:
				print("...")
			break

def carl_loop():
	print("-"*15)
	print("Welcome to CARL - Computer Assisted Real Language")
	print("-"*15)

	f = open('dict.json')
	data = json.load(f)

	while True:
		usr_input = input("CARL >>> ")
		
		if usr_input == "END":
			break


		print_results(usr_input, data[usr_input])



if __name__ == "__main__":
    carl_loop()