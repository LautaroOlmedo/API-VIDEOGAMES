import React from "react";
import { Link } from "react-router-dom";

export default function VideoGame({games = []}){
    return(
        
        <div className="row">
            {
                games && games.map((el, index) => {
                    return(
                    <div key={index} className="col mb-5">
                        <center>
                        <div className="card">
                            <img src={el.image} alt="not found" style={{width: "309px", height: "200px"} } />
                            <div className="card-body">
                                <h5 className="card-title">{el.name}</h5>
                                <hr />
                                
                                <p>Rating: {el.rating}</p>
                                <p>Genres: {el.genres}</p>
                                <hr />
                                <Link to={'/home/' + el.id}><button type="button" class="btn btn-dark">DETAIL</button></Link>
                            </div>

                        </div>
                        </center>
                    </div>
                )})    
            }
            
            
        </div>
    )
      
        
};