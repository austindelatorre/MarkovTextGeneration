import React from 'react';
import css from "./header.module.css"

export default function Header()
{
    return(
        <header className={css.header}>
            <div className={css.headerItem}>
                C.A.R.L
            </div>
            <div className={css.headerItem}>
                COMPUTER ASSISTED REAL LANGUAGE
            </div>
        </header>
    );
}