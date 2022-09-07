import React from "react";
import { useState } from "react";
import './CSS/Pages.css'




export default function Pages({gamesPerPage, paginado, games}){

    const pagesNumber = []

    for(let i = 1; i <= Math.ceil(games/gamesPerPage); i++){
        pagesNumber.push(i);
    };
   
    

    return(
        <div className="Contenedor">
       
            <nav className="Paginado">
                <ul>
                    {
                        pagesNumber && pagesNumber.map(number =>(
                            <li className="paginate" key={number}>
                                <a onClick={() => paginado(number)}>{number}</a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
         
        
    )
}