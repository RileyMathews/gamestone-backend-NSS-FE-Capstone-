import { PlayerCharacter } from "api-clients/src";
import React from "react";

const Character = (character: PlayerCharacter) => {
    return (
        <div>
            <h3>{character.name}</h3>
        </div>
    )
}

export default Character
