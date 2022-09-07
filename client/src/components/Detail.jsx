import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { getDetail } from "../redux/actions";
import { useParams } from "react-router-dom";
import './CSS/Detail.css'


export default function Detail(){

  const {id} = useParams(); 
  console.log(id);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
  },[dispatch]);


  const myGame = useSelector((state) => state.detail)
  console.log(myGame);
 

  return(
    <div className="Contenedor">
      {
          myGame && myGame.length ? <div>
          <h2>Name: {myGame[0].name}</h2>
          <h2>Released: {myGame[0].released}</h2>
          <h2>Rating: {myGame[0].rating}</h2>
          <h2>Platforms: {myGame[0].platforms + (' ')}</h2>
          <h2>Genders: {!myGame[0].createdInDb ? myGame[0].genders + (' ') : myGame[0].genders}</h2>
          <img src={myGame[0].image  } width={'240px'} height={'200px'} alt="Immage not found"  />
          <h3>Description: {myGame[0].description}</h3>
          </div>
         :
         <div>ERROR</div>
      
      }
      
     <Link to={'/home'}><button>HOME</button></Link>
    </div>
  )





}
  