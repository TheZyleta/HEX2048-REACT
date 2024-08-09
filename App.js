import React, { useState } from 'react';
import {APP_STATES} from './constants';
import Menu from './Menu.js';
import Game from './Game.js';

function App() {
  const [appState, setAppState] = useState(APP_STATES.MENU);
  const [radiusLvl, setRadius] = useState(3)
  const handleSelectRadius = (radius) =>{
    setRadius(parseInt(radius.target.value))
  };
  const handleExit = () =>{
    setAppState(APP_STATES.MENU)
  }
  const goToGame = () => {
    setAppState(APP_STATES.GAME);
  };
 /* const goToMenu = () => {
    setAppState(APP_STATES.MENU);
  }; */
  return (
    <>
      {appState === APP_STATES.MENU && (
          <Menu
            handleSelectRadius={handleSelectRadius}
            radiusLvl={radiusLvl}
            goToGame={goToGame}
          />
        )}
        {appState == APP_STATES.GAME && (
          <Game
            handleExit={handleExit}
            radiusLvl={radiusLvl} 
            />
        )}
    </>
  );
}

export default App;
