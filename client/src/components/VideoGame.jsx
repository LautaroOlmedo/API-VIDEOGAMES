import React from "react";

export default function videoGame({name, image, gender}){
    return(
        <React.Fragment>
            <center>
            <h3>{name}</h3>
            <h3>{gender}</h3>
            <img src={image} alt='Image not found' height={200} width={350}/>
            </center>
        </React.Fragment>
    );
};