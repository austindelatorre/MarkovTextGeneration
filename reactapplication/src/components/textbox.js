import React, {useEffect, useState} from 'react';
import {suggest_text} from "../backend/suggest_text.js"
import css from "./textbox.module.css"
import predict_text2 from "../backend/predict_text";

let suggestions = null;


export default function Textbox(props) 
{
    console.log("at the top of textbox code");
    //importing the json file
    const {data} = props;

    const [modeText, setModeText] = useState('Suggesting Text. Click To Predict Text');
    const [predictOn, setPredictOn] = useState(false);

    const [predictClicked, setPredictClicked] = useState(false);

    const [input, setInput] = useState('');
    const [words, setWords] = useState([]);

    // keeps track of what char we have accounted for. Used to see whether there is new input
    const [iter, setIter] = useState(0);

    // keeps track of the start index of the word that is about to be pushed. Bad name, fix
    const [lastWordIter, setLastWordIter] = useState(0);

    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        console.log("re-render because input changed:", input);

        if (iter !== input.length)
        {
            findWords(input);
        }
    } );


    //searching for suggestions
    function findWords(a) {

        // Must set to false by default (with each change)
        setShowSuggestions(false);



        // we have added a character
        if( a.length >= iter)
        {

            let newIter = iter + 1;
            setIter(newIter);

            if (a.endsWith(" "))
            {

                // gets the word from the end of the previous gotten word
                //seed_key_raw is untrimmed seed_key
                const seed_key_raw = a.substring(lastWordIter).toLowerCase();

                // this is what we push to words
                const seed_key = seed_key_raw.trim();

                if (seed_key !== "")// don't push space seed_key to words
                {
                    console.log("About to push seedkeyraw.trim() to words: ", seed_key, " | lastWordIter = ", lastWordIter);

                    // adds seed_key to words list
                    words.push(seed_key);
                    setWords(words);

                    // updates lastWordIter to be start of next word (+1 for space)
                    setLastWordIter((lastWordIter + seed_key_raw.length));
                    console.log("Last word iter", lastWordIter);

                    // takes up to the most recent 3 words
                    let j = -3;
                    let mega_seed_key;

                    // decreases mega_key_size while no suggestions available


                    // Suggest Text
                    if (predictOn === false)
                    {
                        suggestions = null;
                        while (suggestions == null &&  j !== 0)
                        {
                            mega_seed_key = words.slice(j).join(" ");
                            suggestions = suggest_text(data, mega_seed_key, 10);
                            j++;
                        }
                        setShowSuggestions(true);
                    }
                    else if (predictOn === true && predictClicked === true) // Predict Text
                    {
                        setPredictClicked(false); //return toggle to false

                        let prediction = null;
                        let wordsPredicted = 0;

                        while (wordsPredicted < 3 || prediction !== null)
                        {
                            prediction = predict_text2(data, words, 3);
                            if (prediction !== null) // if we have a valid prediction push to words and input
                            {
                                setInput(input + prediction + " ");
                                setLastWordIter(iter); // not sure
                                setIter(iter + prediction.length + 1);

                                words.push(prediction);
                                setWords(words);
                            }
                            wordsPredicted++;
                        }
                    }


                }
            }
        }
        else // a.length < i , we have deleted a character
        {
            setIter(iter - 1);
            if(a.endsWith(" ")) // We have deleted a full word
            {
                // Maybe frowned upon to directly mutate words
                let deletedWord = words.pop();
                setWords(words);

                setLastWordIter(lastWordIter - (deletedWord.length + 1)); // lastWordIter is set to start of new previous word
            }

        }
    }


    function addToInput(text){
        setInput(input + text + " ");
    }

    //get characters
    const onChange = (e) => {
        console.log("On change; e.target.value=",e.target.value);
        let newInput = e.target.value;
        setInput(newInput);

        setActiveSuggestionIndex(0);
      };
    

    const onClick = (e) => {
        setInput(input + e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
      };


    // Delete??
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
                <em>No suggestion available. Type a word and press space first!</em>
            </div>
            );
        }



    const onToggle = () =>{
        if(predictOn === true){
            setModeText('Suggesting Text. Click to Predict Text');
        }
        else
        {
            setModeText('Predicting Text. Click to Suggest Text');
        }

        setPredictOn(!predictOn);
        console.log("button clicked");
    }

    const onPredict = () => {
        console.log("on Predict clicked");
        setPredictClicked(true);
    }

    return(
        <div className = {css.content}>
            <button  className={css.button} onClick={onToggle}>
                {modeText}
            </button>
            <form autoComplete = "off">
                <div className = {css.autocomplete}>
                    <textarea type="text" placeholder="Type a word and press space for a suggestion" id="carlInput" value={input} onChange={onChange} onKeyUp = {onSpace} />
                    {showSuggestions && <AutoSuggestionList />}
                </div>
            </form>
            <button className={css.button} onClick={onPredict}>
                Predict 3 words
            </button>

        </div>
    );
}




//specifically check for spacebar press
    //find keycode for spacebar

    //up or down arrows
    //enter key
    //click event
    