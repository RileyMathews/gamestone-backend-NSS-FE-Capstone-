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
    soulGems: number;
    plants: number;
    septims: number;
    experience: number;
}

const ResourcesView = (props: ComponentProps) => {
    const apiClient = new SkyrimHelperApi(
        new Configuration({
            basePath: location.origin,
            headers: {
                "X-CSRFToken": Cookies.get("csrftoken") || "",
            },
        })
    );

    const [character, setCharacter] = useState(props);

    const updateResource = (resourceName: string, ammount) => {
        const player = { ...character };
        player[resourceName] += ammount;
        if (player[resourceName] < 0) {
            return;
        }
        setCharacter(player);
        apiClient.skyrimHelperApiPlayerCharactersUpdate({
            uuid: props.uuid,
            playerCharacter: player,
        });
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
                    soul gems: {character.soulGems}{" "}
                    <button onClick={() => updateResource("soulGems", 1)}>
                        +1
                    </button>
                    <button onClick={() => updateResource("soulGems", -1)}>
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
