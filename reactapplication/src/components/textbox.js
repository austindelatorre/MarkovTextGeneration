import React from 'react';
import css from "./textbox.module.css"

export default function textbox() 
{
    return(
        <div className = {css.content}>
            <form autocomplete = "off">
                <div className = {css.text}>
                    <textarea type="text" placeholder="Type a word"/>
                </div>
            </form>
        </div>
    );
}


