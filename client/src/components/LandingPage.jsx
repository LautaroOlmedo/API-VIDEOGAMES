import React from "react";
import { Link } from "react-router-dom";
import './CSS/LandingPage.css';


export default function LandingPage(){
    return(
        <div className="FondoLanding">
            <h1>Videogames API</h1>
            <Link to={'/home'}>
                <button className="ButonLanding">HOME</button>
            </Link>
        </div>
    )
}