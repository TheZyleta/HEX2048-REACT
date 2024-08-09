import React from "react";

const PickRadius = ({ handleSelectRadius, radiusLvl }) => {

    return (
        <div className="Radius">
            <p>RADIUS: {radiusLvl}</p>
            <input
                type="range"
                min={2}
                max={20}
                value={radiusLvl}
                onChange={handleSelectRadius}
            />

        </div>
    )
}

export default PickRadius;