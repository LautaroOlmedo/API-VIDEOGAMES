import React from "react";
import { Link } from "react-router-dom";
import s from '../components/LandingPage.module.css'

export default function LandingPage(){
    return(
        <div>
            <h1>Videogames API</h1>
            <Link to={'/home'}>
                <button>HOME</button>
            </Link>
        </div>
    )
}