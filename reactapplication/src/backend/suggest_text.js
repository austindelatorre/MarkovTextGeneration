// returns (an array) top n suggested words (based on probability) based on a seed_key phrase (can be up to 5 words)
export function suggest_text(data, seed_key, n)
{
   // let tools = require('./tools');

    // let data = tools.json_to_js("dict.json");
    let following_words = data[seed_key];
    return following_words.slice(0,n);
}
