import { useState } from "react";
import CharacterView from "./charactersView";
import ResourcesView from "./resourcesView";

export default function App() {
    const [selectedCharacter, setSelectedCharacter] = useState()

    const selectCharacter = (uuid) => {
        setSelectedCharacter(uuid)
    }

    const removeSelectedCharacter = () => {
        setSelectedCharacter(undefined)
    }

    return(
        <div>
            {selectedCharacter === undefined ? 
                <CharacterView selectCharacter={selectCharacter}/>
                :
                <ResourcesView uuid={selectedCharacter} clearCharacter={removeSelectedCharacter} />
            }
        </div>
    )
}
