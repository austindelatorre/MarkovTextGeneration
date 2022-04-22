import React from 'react';
import css from "./footer.module.css"

export default function footer() 
{
    return(
        <div className = {css.footer}>
            <div className = {css.desc}>
                Copyright 2001-2022 by The Boys. All Rights Reserved.
            </div>
        </div>
    );
}
