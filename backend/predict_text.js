// import {json_to_js} from "./tools";

let tools = require('./tools');

let data = tools.json_to_js("dict.json");
console.log(predict_text(data, "my", 4, false, 5))

/* data is dictionary of arrays of arrays
* seed_key starts the generation
* n words are generated
* keysize (and therefore dataset 'data') is constant. (The alternative is to use a growing keysize)
* constant_key_size is bool; false is growing key size
* key will grow up until it has reached a key size of max_key_size
 */
function predict_text(data, seed_key, n, constant_key_size, max_key_size) {
    let result = [];

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



//  creates a random variable with values and probabilites of a give array and then returns an outcome
// arr = [[word1, prob1], [word2, prob2],...]
function rand_outcome(arr) {
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


