import React from "react";
import { getAllGames } from "../../redux/actions";
import {useDispatch, useSelector} from 'react-redux';



export default function Pagination({prev, next}){

    const dispatch = useDispatch();
  

    const handlePrevious = () =>{
        prev()
        
       
    };

    const handleNext = () =>{
        
        next()
    };

    return(
        <div>
            <ul className="pagination justify-content-center">
               
                    <li className="page-item">
                    <button className="page-link" onClick={() => handlePrevious()}>Prev</button>
                    </li>
                
                    
                    <li>
                    <button className="page-link" onClick={() => handleNext()}>Next</button>
                    </li>
                   
            </ul>
        </div>
    )
};