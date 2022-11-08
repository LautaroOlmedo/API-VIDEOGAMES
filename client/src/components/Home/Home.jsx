import React, { useState } from 'react';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { Link } from "react-router-dom";
import { getAllGames, getNextGames } from '../../redux/actions';
import VideoGame from '../VideoGame/VideoGame';
import Pagination from '../Pagination/Pagination';
//import SearchBar from './SearchBar';


export default function Home(){

    const dispatch = useDispatch();
    const games = useSelector((state) => state.videoGames);
    console.log(games.length);
    console.log(games.data1, 'MIS GAMES');

    const nextGames = useSelector((state) => state.nextGames);
    console.log(nextGames);
    
    
    useEffect(() =>{
        dispatch(getAllGames(0))
    }, [dispatch]);

    // useEffect(() =>{
    //     dispatch(getNextGames(games.next))
    // }, [dispatch]);

    return(
       
    
        <div className='container mt-50' >

            <h1 >API Videogames Lautaro Olmedo</h1>
            <hr />
            
            <Pagination/>
          
            <div className='container mt-10'>
                <VideoGame games={games.data1}/>
            </div>
          
            <Pagination />
        </div>
    )
};