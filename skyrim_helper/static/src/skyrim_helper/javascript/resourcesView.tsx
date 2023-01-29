import {
    Configuration,
    SkyrimHelperApi,
} from "api-clients/src";
import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";

interface ComponentProps {
    uuid: string;
    name: string;
    ore: number;
    soul_gems: number;
    plants: number;
    septims: number;
    experience: number;
}

const updatePlayerInApi = (uuid, data) => {
    fetch(`${location.origin}/skyrim-helper/api/player-characters/${uuid}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
    });
}

const ResourcesView = (props: ComponentProps) => {
    const [character, setCharacter] = useState(props);

    const updateResource = (resourceName: string, ammount) => {
        const player = { ...character };
        player[resourceName] += ammount;
        if (player[resourceName] < 0) {
            return;
        }
        setCharacter(player)
        updatePlayerInApi(props.uuid, {[resourceName]: player[resourceName]})
    };

    return (
        <div>
            <div>
                <h3>{character.name}</h3>
                <p>
                    ores: {character.ore}{" "}
                    <button onClick={() => updateResource("ore", 1)}>+1</button>
                    <button onClick={() => updateResource("ore", -1)}>
                        -1
                    </button>
                </p>
                <p>
                    soul gems: {character.soul_gems}{" "}
                    <button onClick={() => updateResource("soul_gems", 1)}>
                        +1
                    </button>
                    <button onClick={() => updateResource("soul_gems", -1)}>
                        -1
                    </button>
                </p>
                <p>
                    plants: {character.plants}{" "}
                    <button onClick={() => updateResource("plants", 1)}>
                        +1
                    </button>
                    <button onClick={() => updateResource("plants", -1)}>
                        -1
                    </button>
                </p>
                <p>
                    septims: {character.septims}{" "}
                    <button onClick={() => updateResource("septims", 1)}>
                        +1
                    </button>
                    <button onClick={() => updateResource("septims", -1)}>
                        -1
                    </button>
                </p>
                <p>
                    experience: {character.experience}{" "}
                    <button onClick={() => updateResource("experience", 1)}>
                        +1
                    </button>
                    <button onClick={() => updateResource("experience", -1)}>
                        -1
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ResourcesView;
