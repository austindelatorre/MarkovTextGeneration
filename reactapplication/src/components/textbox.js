import React, {useState} from 'react';
import {suggest_text} from "../backend/suggest_text.js"
import css from "./textbox.module.css"

//storing the previous input to subtract from input so search only using the current word
var lastWord = null;

//output of suggest text
var suggestions;
//var trimmedInput = null;

export default function Textbox(props) 
{
    //importing the json file
    const {data} = props;
    
    const [input, setInput] = useState('');
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);

    function findWords(a) {
        if (lastWord === null)
            {
                const seed_key = (a.trimEnd().toLowerCase());
                suggestions = suggest_text(data, seed_key, 10);
            }
            else if (a.substring(lastWord.length) !== " ")
            {
                console.log("SUBSTRING", a.substring(lastWord.length));
                let trimmedInput = a.substring(lastWord.length);
                console.log("TRIMMEDINPUT", trimmedInput.trim());
                const seed_key = (trimmedInput.trim().toLowerCase());
                suggestions = suggest_text(data, seed_key, 10);
            }
            lastWord = input.trim();
    }
    

    console.log("INPUT VALUE", input);
    if (input.endsWith(' ')) //
    {
        //console.log("THIS IS WERE WE AUTO SUGGEST THE PREVIOUS VALUE")
        //console.log("INPUT WITHOUT THE SPACE?", input.trim());
        findWords(input);
        console.log("suggesions", suggestions);
    }

    const onChange = (e) => {
        setInput(e.target.value);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
      };
    

    const onClick = (e) => {
        setInput(input + e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
      };

    const AutoSuggestionList = () => {
        return suggestions.length ? (
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
                    <textarea type="text" placeholder="Type a word and press space for a suggestion" id="carlInput" value={input} onChange={onChange}/>
                    {showSuggestions && lastWord && <AutoSuggestionList />}
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
    