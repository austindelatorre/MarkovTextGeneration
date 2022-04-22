var fs = require('fs');
var json_data = fs.readFileSync('carl.json', 'utf8');
var data = JSON.parse(json_data);

console.log(data["great"]);
console.log(typeof "my string");

console.log(rand_outcome(data["great"]))

console.log(gen_n_words_constant_keysize(data, "the", 7))
/* data is dictionary of arrays of arrays
* seed_key starts the generation
* n_words are generated
* keysize (and therefore dataset 'data') is constant. (The alternative is to use a growing keysize)
 */
function gen_n_words_constant_keysize(data, seed_key, n_words)
{
    let result = [];

    for (let i = 0; i < n_words; i++)
    {
        if (i != 0)
        {
            seed_key = result[i-1];
        }

        if (!(seed_key in data))
        {
            return result;
        }

        result.push(rand_outcome(data[seed_key]));
    }
    return result;
}


//  creates a random variable with values and probabilites of a give array and then returns an outcome
// arr = [[word1, prob1], [word2, prob2],...]
function rand_outcome(arr)
{
    const rand_dec= Math.random();
    let sum = 0;

    for (let i = 0; i < arr.length; i++)
    {
        const elem = arr[i]

        if (rand_dec < sum)
        {
            return elem[0];
        }
        else
        {
            sum += elem[1];
        }
    }

    // Should never get to here unless there is a bug
    return arr[0][0]
}



