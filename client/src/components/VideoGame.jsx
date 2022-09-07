import React from "react";
import { Link } from "react-router-dom";
import './CSS/Card.css'

export default function videoGame({name, image, gender, rating, id}){
    return(
                <div className="Card">
                    <h2>{name}</h2>
                    <p className="Rating">{rating}</p>
                    <h3>{gender}</h3>
                    <img className="imgCard" src={image} alt='Image not found' height={200} width={250}/>
                    <br/>
                    <Link to={'/home/' + id}><button className="BotonDetail">Detail</button></Link>
                </div> 
    );
};