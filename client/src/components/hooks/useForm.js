import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postGame } from "../../redux/actions";

const dispatch = useDispatch();




export const useForm = (initialForm, validateForm) =>{
    const [game, setGame] = React.useState(initialForm);
    const [errors, setErrors] = React.useState({});
    const [loagind, setLoading] = React.useState(false);
    const [response, setResponse] = React.useState(null);

    const handleChange =(e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setGame({
            ...game,
            [name] : value
        });

    };
    const handleBlur =(e) =>{
        handleChange(e);
        setErrors(validateForm(game));
        
    };
    const handleSubmit =(e) =>{
      e.preventDefault();
    };

    const handleChangePlatform =(e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setGame({
            ...game,
            platforms : [...game.platforms, e.target.value]
        });

    };

    const handleChangeGender =(e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setGame({
            ...game,
            genders : [...game.genders, e.target.value]
        });

    };
    return{
        game,
        errors,
        loagind,
        response,
        handleChange,
        handleChangePlatform,
        handleChangeGender,
        handleBlur,
        handleSubmit,
        
    };
};