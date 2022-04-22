# Markov Text Generation
#### C.A.R.L. (Computer Assisted Real Language)
Just some boys tying to make a mediocre auto text completion software using the powers given to us from Carl McTague. 

## Current Testing Usage

- Make sure to install node.js
- Make sure current directory is src
- run ```python main.py``` to generate dictionary *"dict.json"* (currently 1 to 5 degrees) for the urls in *"urls.txt"*
- run ```node predict_text.js``` to test text prediction with dictionary "dict.json"
  - Need to use the function ```predict_text(...)``` in react part of application 
### About ```predict_text(...)```
- Full function header: ```predict_text(data, seed_key, n, constant_key_size, max_key_size)```
  - **data**: the re-parsed json file back into the dictionary of arrays of arrays
    - Currently parsing is done at top of the file. Maybe put into a function?
  - **seed_key**: seed_key is the first word (or phrase) that is used to begin text generation
  - **n**: number of words to predict in total
  - **constant_key_size**: True if key is always 1 word , false if key grows by adding words it has predicted
    - Maybe not working in true case when inital seed_key is more than 1 word
  - **max_key_size**: Should be set to max degree of dictionary. In case of growing key size, key size will not exceed this value


## Using this Repository
- please be careful using github. Make sure when you push changes you are pushing your own code to the script you are working on. You can really mess stuff up if you are not careful.
- Make sure to comment inline with your code and put proper commit messages with every commit.
## Project Overview
### Proposal
 Our proposal and LaTex file.
### Write-Up
 A file for us to work on our write up to go into.
### model1
 A very hacky first implementation of the concept. 
## To-Do
- Data Scraping for training text
   - **STILL BROKEN SOMTIMES**
- Parsing Data needs to be fixed
- Front end and JS prediction logic
   - Prediction is mostly done
- Finalizing Chain formatting and structure
- Do hard math on probibility of back and foward calculation 
