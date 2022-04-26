for x in range (1, 100):
    message = ""
    if x % 3 == 0:
        message += "Fizz"
    if x % 5 == 0:
        message += "Buzz"
    if message == "":
        print(x)
    else:
        print(message)
