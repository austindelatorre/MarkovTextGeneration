import React from 'react';
import css from "./about.module.css"

export default function about() 
{
    return(
        <div className = {css.content}>
            <div className = {css.title}>
                About us
            </div>
            <div className = {css.desc}>
                Just some boys tying to make a mediocre auto text completion software using the powers given to us from Carl McTague.
            </div>
        </div>
    );
}
