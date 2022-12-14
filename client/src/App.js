import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
//import CreateGame from './components/CreateGame/CreateGame.jsx'
// import Detail from './components/Detail/';

function App() {
  return (
    <React.Fragment>
      <Route exact path={'/'}>
        <LandingPage />
      </Route>
      <Route exact path={'/home'}>
        <Home />
      </Route>
      {/* <Route exact path={'/create'}>
        <CreateGame />
      </Route> */}
      {/* <Route exact path={'/home/:id'}>
        <Detail />
      </Route> */}
  </React.Fragment>
  );
}

export default App;
