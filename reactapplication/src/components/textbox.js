import React, {useState} from 'react';
import {suggest_text} from "../backend/suggest_text.js"
import css from "./textbox.module.css"

export default function Textbox(props) 
{
    const {data} = props;
    //read the input from textarea
    //read for a space between words
    //take the value of the text and console.log it
    
    //suggest_text()
    const [input, setInput] = useState('');
    console.log("TEXT-AREA VALUE", input);
    if (input !== ""){
        console.log("continue")
        if (input.endsWith(' '))
        {
            console.log("THIS IS WERE WE AUTO SUGGEST THE PREVIOUS VALUE")
            console.log("INPUT WITHOUT THE SPACE?", input.trim());
            const seed_key = (input.trimEnd());
            console.log("TEST SUGGESTION", suggest_text(data, seed_key, 10))
        }
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
    