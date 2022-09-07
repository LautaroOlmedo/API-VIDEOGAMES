import React, { useState } from 'react';
import {  getAllGames,  
    filterByGender,
    filterCreated, 
    filterByRating,  
    orderByName,
    getPlatforms,
    getAllGenders} from '../redux/actions';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import VideoGame from './VideoGame'
import Pages from './Pages';
import { Link } from "react-router-dom";
import SearchBar from './SearchBar';
import './CSS/Home.css'



export default function Home(){

    const dispatch = useDispatch();
    const games = useSelector((state) => state.videoGames);
    const gender = useSelector((state) => state.genders);
   
    
    

    const [order, setOrder] = React.useState('')
    const [orderR, setOrderR] = React.useState('');

    const [currentPage, setCurrentPage] = React.useState(1);
    const [gamesPerPage, setGamePerPage] = React.useState(15);
    const indexOfLastGame = currentPage * gamesPerPage; // 15
    const indexOfFirstGame = indexOfLastGame - gamesPerPage; 
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    const paginado = (numberPage) =>{
        setCurrentPage(numberPage);
    }
   
    useEffect(() =>{
        dispatch(getAllGames())
    }, [dispatch]);
    useEffect(() =>{
        dispatch(getPlatforms())
    },[dispatch])
    useEffect(() =>{
        dispatch( getAllGenders())
    },[dispatch])

    const handleRefresh = (e) =>{
        e.preventDefault();
        dispatch(getAllGames());
        window.location.reload();
    };

    const handleCreated = (e) =>{
        dispatch(filterCreated(e.target.value));
    }
    const handleGender = (e) =>{
        dispatch(filterByGender(e.target.value));
    }

    const handleRating = (e) =>{
        dispatch(filterByRating(e.target.value));
        console.log(e.target.value);
        setCurrentPage(1);
        setOrderR(`Orden ${e.target.value}`)
    };

    const handleOrderByName = (e) =>{
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    };

    return(
          <div className='FondoHome'>
             {/* <Pages gamesPerPage={gamesPerPage} games={games.length} paginado={paginado} /> */}
          <center>
          <Pages gamesPerPage={gamesPerPage} games={games.length} paginado={paginado} />
            <h1 >API Videogames Lautaro Olmedo</h1>

            <br/>
            <SearchBar />

            <br/>

            <Link to={'/create'}>
                <button>CREATE</button>
            </Link>

            <br/>

            <button onClick={ e => {handleRefresh(e)}}>REFRESH</button>

            <br/>

            <select onChange={e => {handleOrderByName(e)}}>
                <option value="default">Alphabetic Order</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>

            <br/>

            <select onChange={e => {handleRating(e)}}>
                <option>Default</option>
                <option value="Rasc">Ascendente</option>
                <option value="Rdesc">Descente</option>
            </select>

            <br/>

            <select onChange={ e => {handleCreated(e)}}>
                <option value="all">All</option>
                <option value="crea">Created</option>
                <option value="exis">Existting</option>
            </select>

            <br />

            <select onChange={e => {handleGender(e)}}>
                <option value="All">All</option>
                {
                    gender && gender.map((g, index) =>(
                        <option  key={index} value={g}>{g}</option>
                    ))
                }
            </select>

            <br/>
            
           <div>
           {
                currentGames && currentGames.map((el, index) => {
                    return(
                        <div>
                           
                            <VideoGame id={el.id} rating={el.rating} name={el.name} gender={( !el.createdInDb ? el.genders + ( ' ') : el.genders.map(el => el.name + (',')))} image={el.image} />
                            
                        </div>
                    )})    
            }
           </div>
           <br/>
           </center>
           
            {/* <Pages gamesPerPage={gamesPerPage} games={games.length} paginado={paginado} /> */}
            
          </div>
    )
};