import React, {useEffect, useState} from 'react';
import {suggest_text} from "../backend/suggest_text.js"
import css from "./textbox.module.css"
import {flushSync} from "react-dom";
import useForceUpdate from 'use-force-update';

//storing the previous input to subtract from input so search only using the current word
//var lastWord = null;
//var words = [];
//var lastLastWord = null;

//output of suggest text
var suggestions;
//var trimmedInput = null;
//var k = 0;
var i = 0; // keeps track of if we are adding or deleting characters in a
//var changeMade = false;



export default function Textbox(props) 
{
    console.log("at the top of textbox code");
    //importing the json file
    const {data} = props;
    
    const [input, setInput] = useState('');
    const [words, setWords] = useState([]);
    const [iter, setIter] = useState(0);
    const [lastWordIter, setLastWordIter] = useState(0);

    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    console.log("INPUT TEST", input);


   // findWords(input)

    useEffect(() => {
        console.log("re-render because input changed:", input);

        if (iter !== input.length)
        {
            console.log("Inside iter !== input.length")
            findWords(input);
        }

    } );


    //searching for suggestions
    function findWords(a) {

        console.log("a = |", a, "|");
        console.log("a ends with space", a.endsWith(" "));

        if( a.length >= iter) // we have added a character
        {
            console.log("iter", iter);
            setIter((iter + 1));
            i++;
            if (a.endsWith(" "))
            {
                console.log("a.length > i and a ends with space");
                // gets the word from the end of the previous gotten word
                const seed_key  = (a.substring(lastWordIter).trim().toLowerCase());
                console.log("About to push seedkey to words: ", seed_key, " | lastWordIter = ", lastWordIter);

                // adds seed_key to words list
                words.push(seed_key);
                setWords(words);

                console.log("Just pushed", seed_key, " to words");
                setLastWordIter((lastWordIter + seed_key.length + 1)); // updates k to be start of next word (+1 for space)
                console.log("Last word iter", lastWordIter);

                suggestions = suggest_text(data, seed_key, 10);
                setShowSuggestions(true);
            }

        }
        else // a.length < i , we have deleted a character
        {
            setIter(iter - 1);
            i--
            if(a.endsWith(" ")) // We have deleted a full word
            {
                // Maybe frowned upon to directly mutate words
                let deletedWord = words.pop();
                setWords(words);

                setLastWordIter(lastWordIter - (deletedWord.length + 1)); // k is set to start of new previous word

            }

        }

        console.log("findswords called");
      // there is already a word, you only want to search using the current word. But first check and make sure we don't have a space
       /*
        if (a.endsWith(" "))//a.substring(lastWord.length) !== " "
        {    
            const seed_key  = (a.substring(k).trim().toLowerCase())
            console.log("SUBSTRING", seed_key);
            words.push(seed_key);
            console.log("Just pushed", seed_key, " to words");
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
            const seed_key = (trimmedInput.trim().toLowerCase());
            suggestions = suggest_text(data, seed_key, 10);
            setShowSuggestions(true);
        }
        if (a.length < k )
        {
            console.log("Inside a.length < k")
            console.log("words is ",words );
            let deletedWord = words[words.length -1];
            console.log("deletedWord", deletedWord);
            words.pop();
            console.log("deletedword length = ", deletedWord.length);
            k -= deletedWord.length + 1;
            setShowSuggestions(true);
        }

        */
        console.log("words = ", words)
        console.log("At end of find words; k=", lastWordIter, " | a.length = ", a.length, "| iter = ", iter, "| i = ", i);

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
        console.log("On change; e.target.value=",e.target.value);
        let newInput = e.target.value;
        setInput(newInput);


        console.log("INPUT inside on Change ", input );
        setActiveSuggestionIndex(0);
        //findWords(input);


      };
    

    const onClick = (e) => {
        setInput(input + e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
      };

    const onSpace = (e) => {
      /*  if (e.keyCode === 32)
        {
            console.log("Inside onSpace, here is input", input);
            findWords(input);
        } */
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
                    <textarea type="text" placeholder="Type a word and press space for a suggestion" id="carlInput" value={input} onChange={onChange} onKeyUp = {onSpace} />
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
    