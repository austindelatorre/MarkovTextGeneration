// import {json_to_js} from "./tools";


/* data is dictionary of arrays of arrays
* seed_key starts the generation
* n words are generated
* keysize (and therefore dataset 'data') is constant. (The alternative is to use a growing keysize)
* constant_key_size is bool; false is growing key size
* key will grow up until it has reached a key size of max_key_size
 */

function predict_text(data, seed_key, n, constant_key_size, max_key_size) {
    let result = [];

    // let tools = require('./tools');

    // let data = tools.json_to_js("dict.json");
    for (let i = 0; i < n; i++) {
        if (i !== 0) {
            if (constant_key_size === false){
                let lower_index = Math.max(0, i - max_key_size); // will not go back into negative indices
                let result_slice = result.slice(lower_index, i + 1); // not sure about +1
                seed_key = result_slice.join(' ');
            }
            else{ // single word seed key
                seed_key = result[i-1];
            }
        }

        if (!(seed_key in data)) {
            return result;
        }

        result.push(rand_outcome(data[seed_key]));
    }
    return result;
}


export default function predict_text2(data, words, max_key_size) {
    let prediction = null;
    let mega_seed_key;
    let j = -1 * max_key_size;

    while (prediction == null && j < 0) {
        console.log("inside predict text 2, here is words", words);
        console.log("join test", words.join(" "));
        mega_seed_key = words.slice(j).join(' ');
        prediction = rand_outcome(data[mega_seed_key]);
        console.log("just got prediction", prediction);
        j++;
    }

    return prediction;
}


//  creates a random variable with values and probabilites of a give array and then returns an outcome
// arr = [[word1, prob1], [word2, prob2],...]
function rand_outcome(arr) {
    if (arr === undefined)
    {
        return null;
    }
    const rand_dec= Math.random();
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        const elem = arr[i]

        if (rand_dec < sum) {
            return elem[0];
        }
        else {
            sum += elem[1];
        }
    }

    // Should never get to here unless there is a bug
    return arr[0][0]
}


