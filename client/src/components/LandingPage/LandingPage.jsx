import React from "react";
import { Link } from "react-router-dom";



export default function LandingPage(){
    return(
        <div className="FondoLanding">
            <h1 className="">Videogames API</h1>
            <Link to={'/home'}>
                {/* <button className="ButonLanding">HOME</button> */}
                <button type="button" class="btn btn-outline-dark">HOME</button>
            </Link>
        </div>
    )
}