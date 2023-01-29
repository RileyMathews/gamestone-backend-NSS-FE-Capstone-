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
};

const ResourcesView = (props: ComponentProps) => {
    const [character, setCharacter] = useState(props);

    const updateResource = (resourceName: string, ammount) => {
        const player = { ...character };
        player[resourceName] += ammount;
        if (player[resourceName] < 0) {
            return;
        }
        setCharacter(player);
        updatePlayerInApi(props.uuid, { [resourceName]: player[resourceName] });
    };

    return (
        <div>
            <div>
                <h3>{character.name}</h3>
                <p className="my-4">
                    ores: {character.ore}{" "}
                    <button
                        className="text-white border-2 border-sky-600 rounded-md px-2 bg-sky-500 mx-4"
                        onClick={() => updateResource("ore", 1)}
                    >
                        +1
                    </button>
                    <button
                        className="text-white border-2 border-sky-600 rounded-md px-2 bg-sky-500 mx-2"
                        onClick={() => updateResource("ore", -1)}
                    >
                        -1
                    </button>
                </p>
                <p className="my-4">
                    soul gems: {character.soul_gems}{" "}
                    <button
                        className="text-white border-2 border-sky-600 rounded-md px-2 bg-sky-500 mx-2"
                        onClick={() => updateResource("soul_gems", 1)}
                    >
                        +1
                    </button>
                    <button
                        className="text-white border-2 border-sky-600 rounded-md px-2 bg-sky-500 mx-2"
                        onClick={() => updateResource("soul_gems", -1)}
                    >
                        -1
                    </button>
                </p>
                <p className="my-4">
                    plants: {character.plants}{" "}
                    <button
                        className="text-white border-2 border-sky-600 rounded-md px-2 bg-sky-500 mx-2"
                        onClick={() => updateResource("plants", 1)}
                    >
                        +1
                    </button>
                    <button
                        className="text-white border-2 border-sky-600 rounded-md px-2 bg-sky-500 mx-2"
                        onClick={() => updateResource("plants", -1)}
                    >
                        -1
                    </button>
                </p>
                <p className="my-4">
                    septims: {character.septims}{" "}
                    <button
                        className="text-white border-2 border-sky-600 rounded-md px-2 bg-sky-500 mx-2"
                        onClick={() => updateResource("septims", 1)}
                    >
                        +1
                    </button>
                    <button
                        className="text-white border-2 border-sky-600 rounded-md px-2 bg-sky-500 mx-2"
                        onClick={() => updateResource("septims", -1)}
                    >
                        -1
                    </button>
                </p>
                <p className="my-4">
                    experience: {character.experience}{" "}
                    <button
                        className="text-white border-2 border-sky-600 rounded-md px-2 bg-sky-500 mx-2"
                        onClick={() => updateResource("experience", 1)}
                    >
                        +1
                    </button>
                    <button
                        className="text-white border-2 border-sky-600 rounded-md px-2 bg-sky-500 mx-2"
                        onClick={() => updateResource("experience", -1)}
                    >
                        -1
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ResourcesView;
