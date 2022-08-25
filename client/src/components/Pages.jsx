import React from "react";
import { useState } from "react";
import s from '../components/Pages.module.css'
export default function Pages({page, setPage, max}){
    // console.log(page, setPage, max)
    const [input, setInput] = useState(1);

    const handleNext = () =>{
        setInput(input + 1);
        setPage(page+ 1);
    }
    const handlePrevious = () =>{
        setInput(input - 1);
        setPage(page - 1);
    }

    return(
        <React.Fragment>
            {
                input > 1 ? <button  onClick={handlePrevious}>Previous</button> : null
            }
            <input value={input}></input>
            <p>de {Math.ceil(max)}</p>
            {
                input < 7 ? <button className={`${s.button}`} onClick={handleNext}>Next</button> : null
            }
        </React.Fragment>
    )
}