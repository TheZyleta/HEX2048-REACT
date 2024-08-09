import React from 'react';
import PropTypes from 'prop-types';
import Exit from './Exit'
import { GAME_STATES } from './constants';

const Bg = ({ variant,handleExit}) => {
  const bgPattern = variant === 'game' ? 'bgPatternGame' : 'bgPatternMenu';
  return (
    <div className={`${bgPattern}`}>
      {variant==='game'&&<Exit handleExit={handleExit} />}
    </div>
  );
};

Bg.propTypes = {
  variant: PropTypes.string,
};
export default Bg;
