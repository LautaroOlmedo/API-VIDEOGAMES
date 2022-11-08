import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postGame, getAllGenders } from "../../redux/actions";

export const useForm = (initialForm, validateForm) =>{
    const dispatch = useDispatch();
    const history = useHistory();

    const [game, setGame] = React.useState(initialForm);
    const [errors, setErrors] = React.useState({});
   
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
      setErrors(validateForm(game));

      if(Object.keys(errors).length === 0){
          
           dispatch(postGame(game));
                alert('VideoGame created!!');
                setGame({
                    name: '',
                    description: '',
                    released: '',
                    rating: 0,
                    genders: [],
                    platforms: [],
                    createdInDb: true
                });
            history.push('/home');
        }else{
            return;
        }
    };

    const handleChangePlatform =(e) =>{
        e.preventDefault();
        e.target.value !== 'Select a platform' ?
        setGame({
            ...game,
            platforms : [... new Set([...game.platforms, e.target.value])]
        }) :
        alert('platform unknow')

    };

    const handleChangeGender =(e) =>{
        e.preventDefault();
        e.target.value !== 'Select a genre' ?
        setGame({
            ...game,
            genders : [... new Set([...game.genders, e.target.value])]
        }) :
        alert('genre unknow');

    };
    const handleDeletePlatform =(el) => {
        setGame({
          ...game,
          platforms: game.platforms.filter((oc) => oc !== el),
        });
    };
    const handleDeleteGender =(el) => {
        setGame({
          ...game,
          genders: game.genders.filter((oc) => oc !== el),
        });
    }
    return{
        game,
        errors,
        handleChange,
        handleChangePlatform,
        handleChangeGender,
        handleBlur,
        handleSubmit,
        handleDeletePlatform,
        handleDeleteGender
        
    };
};

const initialGame = {
    name: '',
    description: '',
    released: '',
    rating: 0,
    genders: [],
    platforms: [],
    createdInDb: true
};
const validationsGame = (game) =>{
    let errors = {}
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s0-9]+$/;
    let regexCommentsLen = /^.{1,255}$/;
    parseFloat(game.rating)
   
    if(!game.name.trim()){
        errors.name = 'El campo NAME es obligatorio'
    }else if(!regexName.test(game.name.trim())){
        errors.name = 'El campo NAME solo acepta letras y números'
    };

    if(!game.description.trim()){
        errors.description = 'El campo DESCRIPTION es obligatorio'
    }else if(!regexCommentsLen.test(game.description.trim())){
        errors.description = 'El campo DESCRIPTION solo acepta hasta 255 caracteres'
    };

    if(!game.rating){
        errors.rating = 'El campo RATING es obligatorio'
    }else if(game.rating < 0.1 || game.rating > 10.0){
        errors.rating = 'El campo admite valores entre 0.1 y 10.0'
    }

    if(!game.released.trim()){
        errors.released = 'El campo RELEASED es obligatorio'
    };
    
    return errors;
}



export default function CreateGame(){

    const { game,
        errors,
        handleChange,
        handleChangePlatform,
        handleChangeGender,
        handleBlur,
        handleSubmit,
        handleDeletePlatform,
        handleDeleteGender
    } = useForm(initialGame, validationsGame);

    // const dispatch = useDispatch();
    // const history = useHistory();

    const totalPlatforms = useSelector((state) => state.platforms);
    const totalGenders = useSelector((state) => state.genders);
    console.log(totalGenders);
    console.log(totalPlatforms);

    let styles = {
        fontWeight:"bold",
        color: "#dc3545"
    }

    




    return(
        <div className="FormularioStyle">
            <div className="Title">CREATE YOUR OWN GAME</div>
            
            <form className="Form" onSubmit={handleSubmit}>
                <input type="text" 
                name={'name'} 
                placeholder="Game Name.." 
                onBlur={handleBlur}
                onChange={handleChange} 
                value={game.name}
                required/>
                {errors.name && <p style={styles}>{errors.name}</p>}

                <br />
            
                <input type="text" 
                name={'description'} 
                placeholder="Description Game.." 
                onBlur={handleBlur}
                onChange={handleChange} 
                value={game.description}
                />
                {errors.description && <p style={styles}>{errors.description}</p>}

                <br />

                <input type="date" 
                name={'released'} 
                placeholder="Released.." 
                onBlur={handleBlur}
                onChange={handleChange} 
                value={game.released}
                />
                {errors.released&& <p style={styles}>{errors.released}</p>}

                <br />

                <input type="text" 
                name={'rating'} 
                placeholder="Rating.." 
                onBlur={handleBlur}
                onChange={handleChange} 
                value={game.rating}
                />
                {errors.rating && <p style={styles}>{errors.rating}</p>}

                <br />

                <select  className="GenderSelect" onChange={handleChangeGender}>
                        <option>Select a genre</option>
                         {
                             totalGenders && totalGenders.map((g, index) =>(
                        
                                 <option  key={index} value={g}>{g}</option>
                             ))                      
                         }
                         

                </select>
                {game.genders.map((el) => (
                 <div key={el}>
                    <label>{el}</label>
                    <button onClick={() => handleDeleteGender(el)}>X</button>
                </div>
            ))}

                <br />

                <select className="GenderSelect" onChange={handleChangePlatform} >
                        <option >Select a platform</option>
                         {
                             totalPlatforms && totalPlatforms.map((p, index) =>(
                        
                                 <option  key={index} value={p}>{p}</option>
                             ))                      
                         }
                         
                         
                </select>
                {game.platforms.map((el) => (
                 <div key={el}>
                    <label>{el}</label>
                    <button onClick={() => handleDeletePlatform(el)}>X</button>
                </div>
            ))}

                <br />

                <input type="submit" value={'SEND'} />
            </form>
            <Link to={'/home'}><button className="Boton">HOME</button></Link>
        </div>
    )
};

