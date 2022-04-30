import React, {useState} from 'react';
import {suggest_text} from "../backend/suggest_text.js"
import css from "./textbox.module.css"

//storing the previous input to subtract from input so search only using the current word
//var lastWord = null;
var words = [];
//var lastLastWord = null;

//output of suggest text
var suggestions;
//var trimmedInput = null;
var k = 0;
//var changeMade = false;

export default function Textbox(props) 
{
    //importing the json file
    const {data} = props;
    
    const [input, setInput] = useState('');
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    console.log("INPUT", input);

    //searching for suggestions
    function findWords(a) {

        console.log("findswords called");
      // there is already a word, you only want to search using the current word. But first check and make sure we don't have a space
        
        if (a.endsWith(" "))//a.substring(lastWord.length) !== " "
        {    
            const seed_key  = (a.substring(k).trim().toLowerCase())
            console.log("SUBSTRING", seed_key);
            words.push(seed_key);
            if (k === 0) 
            {
                k += seed_key.length;
            }
            else  
            {
                k += seed_key.length + 1;
            }
            console.log("k", k);
           /*  console.log("SUBSTRING", a.substring(lastWord.length));
            let trimmedInput = a.substring(lastWord.length);
            console.log("TRIMMEDINPUT", trimmedInput.trim());
            const seed_key = (trimmedInput.trim().toLowerCase()); */
            suggestions = suggest_text(data, seed_key, 10);
            setShowSuggestions(true);
        }
        else if (a.length < k )
        {
            let deletedWord = words.pop();
            k -= deletedWord.length + 1;
            setShowSuggestions(true);
        }
        //else if (a !== (" "))
        //{
            //setShowSuggestions(false);
        //}
        //lastWord = input.trim();
        // console.log("LAST WORD", lastWord);
    }

    //findWords(input);

    //calling fing words based on word end
    console.log("INPUT VALUE", input);
    /*if (input.endsWith(' ')) //
    {
        //console.log("THIS IS WERE WE AUTO SUGGEST THE PREVIOUS VALUE")
        //console.log("INPUT WITHOUT THE SPACE?", input.trim());
        findWords(input);
        console.log("suggesions", suggestions);
    }*/

    
    //get characters
    const onChange = (e) => {
        setInput(e.target.value);
        setActiveSuggestionIndex(0);
      };
    

    const onClick = (e) => {
        setInput(input + e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
      };

    const onSpace = (e) => {
        if (e.keyCode === 32)
        {
            findWords(input);
        }
    };

    const AutoSuggestionList = () => {
            return (suggestions !== null) ? (
            <ul className={css.suggestions}>
                {suggestions.map((suggestion, index) => {
                let className;
                // Flag the active suggestion with a class
                if (index === activeSuggestionIndex) {
                    className = css.suggestionActive;
                }
                return (
                    <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion[0]}
                    </li>
                );
                })}
            </ul>
            ) : (
            <div class={css.noSuggestions}>
                <em>Type a word and press space first!</em>
            </div>
            );
        }

    return(
        <div className = {css.content}>
            <form autoComplete = "off">
                <div className = {css.autocomplete}>
                    <textarea type="text" placeholder="Type a word and press space for a suggestion" id="carlInput" value={input} onChange={onChange} onKeyUp = {onSpace}/>
                    {showSuggestions && <AutoSuggestionList />}
                </div>
            </form>
        </div>
    );
}




//specifically check for spacebar press
    //find keycode for spacebar

    //up or down arrows
    //enter key
    //click event
    