import React from "react";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { getGameName } from "../../redux/actions";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = React.useState('')

    const handleInputChange = (e) =>{
        e.preventDefault();
        setName(e.target.value);
     
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(getGameName(name));
        setName('')

    }
    return(
        <React.Fragment>
            
            <input onChange={e => {handleInputChange(e)}} type="text" placeholder={"Buscar.."}/>
            <button onClick={e => {handleSubmit(e)}} type="submit">BUSCAR</button>
            

        </React.Fragment>
    )
}