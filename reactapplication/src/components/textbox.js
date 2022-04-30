import React, {useState} from 'react';
import {suggest_text} from "../backend/suggest_text.js"
import css from "./textbox.module.css"

var lastWord = null;
var suggestions;
//var trimmedInput = null;

export default function Textbox(props) 
{
    const {data} = props;
  
    const [input, setInput] = useState('');

    function findWords(a) {
        if (lastWord === null)
            {
                const seed_key = (a.trimEnd());
                suggestions = suggest_text(data, seed_key, 10);
            }
            else if (a.substring(lastWord.length) !== " ")
            {
                console.log("SUBSTRING", a.substring(lastWord.length));
                let trimmedInput = a.substring(lastWord.length);
                console.log("TRIMMEDINPUT", trimmedInput.trim());
                const seed_key = (trimmedInput.trim());
                suggestions = suggest_text(data, seed_key, 10);

            }
            lastWord = input.trim();
    }
    

    console.log("INPUT VALUE", input);
    if (input.endsWith(' '))
    {
        console.log("THIS IS WERE WE AUTO SUGGEST THE PREVIOUS VALUE")
        console.log("INPUT WITHOUT THE SPACE?", input.trim());
        findWords(input);
        console.log("suggesions", suggestions);
    }

    return(
        <div className = {css.content}>
            <form autoComplete = "off">
                <div className = {css.autocomplete}>
                    <textarea type="text" placeholder="Type a word" id="carlInput" value={input} onChange={e=>setInput(e.target.value)}/>
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
    