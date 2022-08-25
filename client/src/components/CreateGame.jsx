import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function CreateGame(){

    const [game, setGame] = useState({
        name: '',
        description: '',
        released: '',
        rating: 0,
        gender: '',
        platforms: '',
        createdInDb: true
    });


    let handleChange = (e) =>{
        e.preventDefault();
        setGame((prev) =>({...prev, [e.target.name] : e.target.value}));
    };
    

    let handleSubmit = () =>{
        // VALIDACION DE DATOS
        if(game.rating !== ''){ 
            parseFloat(game.rating);
        }
        console.log(typeof game.rating);
        if(game.rating < 1.0 || game.rating > 10.0){
            alert('Error en el valor del rating')
            return
        }
        console.log(typeof game.rating);
        console.log(game.platforms)
        console.log(game.gender)
        
        if(game.name === '' || game.description === '' || game.platforms === ''){
            alert('Falta informacion')
            return
        }
        // POST
      
    }

    return(
        <div>
            <div>hola</div>
             <Link to={'/home'}>
                <button>HOME</button>
            </Link>
                <form onSubmit={handleSubmit} >
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" value={game.name} 
                        onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" name="description" value={game.description} 
                        onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <label>Released</label>
                        <input type="date" name="released" value={game.released} 
                        onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <label>Rating</label>
                        <input type="number" name="rating" value={game.rating}
                        onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <label>Gender</label>
                        <input type="text" name="gender" value={game.gender} 
                        onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <label>Platforms</label>
                        <input type="text" name="platforms" value={game.platforms}
                        onChange={(e) => handleChange(e)}/>
                    </div>
                    <br/>
                    <input type="submit" value={"CREATE"} />
                </form>
        </div>
    )
}