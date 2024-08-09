import React from "react";
const StartGame=({goToGame})=>{
   return( <div className="Start">
         <button onClick={goToGame}>START</button>
        {/* <input
            type='button'
            value='Start'
            onClick={goToGame}
            ></input> */}
    </div>
   )
}

export default StartGame;