import React, { useState } from 'react';
import PropTypes from 'prop-types';
import  Bg from './Bg';
import PickRadius from './PickRadius'
import StartGame from './StartGame';
import Logo from './Logo'
import { MENU_STATUSES } from './constants';

const Menu = ({
  handleSelectRadius,
  radiusLvl,
  goToGame
  }) => {
 /*  const [menuStatus, setMenuStatus] = useState(MENU_STATUSES.START);
  const [showResetConfirm, setShowResetConfirm] = useState(false); */
  return (
    <>
    
    <div className="container">
    <Bg variant="menu" />
      <Logo />
        <div className='buttonCont'>
          <PickRadius
            handleSelectRadius={handleSelectRadius}
            radiusLvl={radiusLvl}
          />
        <StartGame
        goToGame={goToGame}
        />
        </div>
        
    
    </div>
             
</>
  );
};

/* Menu.propTypes = {
  handleSelectAiLevel: PropTypes.func.isRequired,
  goToGame: PropTypes.func.isRequired,
  handleSelectSide: PropTypes.func.isRequired,
  handleResetGameData: PropTypes.func.isRequired,
  aiLevel: PropTypes.string.isRequired,
  playerSide: PropTypes.string.isRequired,
}; */
export default Menu;
 