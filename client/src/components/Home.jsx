import React, { useState } from 'react';
import {  getAllGames,  filterCreated } from '../redux/actions';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import VideoGame from './VideoGame'
import s from '../components/Home.module.css'
import Pages from './Pages';
import { Link } from "react-router-dom";
//import CreateGame from './CreateGame';


export default function Home(){

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    
    const dispatch = useDispatch();
    const games = useSelector((state) => state.videoGames);
    console.log(games);
    const max = games.length / perPage;
    console.log(max)

    useEffect(() =>{
        dispatch(getAllGames())
    }, [dispatch]);

    const handleRefresh = (e) =>{
        e.preventDefault();
        dispatch(getAllGames());
    };

    const handleCreated = (e) =>{
        dispatch(filterCreated(e.target.value));


    }



    return(
          <div >
          <center>
            <h1 >API Videogames Lautaro Olmedo</h1>

            <Pages page={page} setPage={setPage} max={max}/>

            <br/>

            <Link to={'/create'}>
                <button>CREATE</button>
            </Link>

            <br/>

            <button onClick={ e => {handleRefresh(e)}}>REFRESH</button>

            <br/>

            <select name="Alphabetic order" id="">
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>

            <br/>

            <select name="Rating order" id="">
                <option value="Rasc">Ascendente</option>
                <option value="Rdesc">Descendente</option>
            </select>

            <br/>

            <select onChange={ e => {handleCreated(e)}}>
                <option value="all">All</option>
                <option value="crea">Created</option>
                <option value="exis">Existting</option>
            </select>

            <br />

            <select name="By genre" id="">
                <option value="">hola</option>
            </select>

            <br/>
            
           <div>
           {
                games && games
                .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                .map(el => {
                    
                    return(
                        <div>
                            <Link to={'/home/' + el.id}>
                                <VideoGame key={el.id} name={el.name} image={el.image} gender={el.gender} />
                            </Link>
                        </div>
                    )})
                    
            }
           </div>
           <br/>
           
            <Pages page={page} setPage={setPage} max={max}/>
            </center>
          </div>
    )
};