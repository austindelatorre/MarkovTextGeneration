import React from 'react';
import {suggest_text} from "../../../backend/suggest_text.js"
import css from "./textbox.module.css"

export default function textbox() 
{
    
    return(
        <div className = {css.content}>
            <form autoComplete = "off">
                <div className = {css.autocomplete}>
                    <textarea type="text" placeholder="Type a word" id="carlInput"/>
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
    