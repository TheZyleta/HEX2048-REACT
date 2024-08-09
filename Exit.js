import React, { useState, useEffect, useRef, usePreviousProps } from 'react';


function Exit({handleExit}){
    return(
        <div className="ex">
      
      <button className='exx' onClick={()=>handleExit()}>EXIT</button>
      
    </div>
       
    )

}

export default Exit