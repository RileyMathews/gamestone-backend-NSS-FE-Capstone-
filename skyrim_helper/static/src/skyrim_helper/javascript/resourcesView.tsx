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
        <div className="m-3">
            <h3 className="text-xl">{character.name}</h3>
            <Resource name={"ore"} buttonColors={"border-zinc-600 rounded-md px-2 bg-zinc-500 active:bg-zinc-900"} ammount={character.ore} updateCallback={(am) => updateResource("ore", am)} />
            <Resource name={"soul gems"} buttonColors={"border-violet-600 rounded-md px-2 bg-violet-500 active:bg-violet-900"} ammount={character.soul_gems} updateCallback={(am) => updateResource("soul_gems", am)} />
            <Resource name={"plants"} buttonColors={"border-green-600 rounded-md px-2 bg-green-500 active:bg-green-900"} ammount={character.plants} updateCallback={(am) => updateResource("plants", am)} />
            <Resource name={"septims"} buttonColors={"border-yellow-600 rounded-md px-2 bg-yellow-500 active:bg-yellow-900"} ammount={character.septims} updateCallback={(am) => updateResource("septims", am)} />
            <Resource name={"experience"} buttonColors={"border-green-600 rounded-md px-2 bg-green-500 active:bg-green-900"} ammount={character.experience} updateCallback={(am) => updateResource("experience", am)} />
        </div>
    );
};

interface ResourceProps {
    name: string;
    ammount: number;
    updateCallback: CallableFunction;
    buttonColors: string;
}

const Resource = (props: ResourceProps) => {
    return (
        <div className="border-4 flex flex-col mb-1">
            <p className="text-lg self-center">
                {props.name}: {props.ammount}{" "}
            </p>
            <button className={`text-white border-2 my-1 ${props.buttonColors}`} onClick={() => props.updateCallback(1)}>
                +1
            </button>
            <button className={`text-white border-2 mt-1 ${props.buttonColors}`} onClick={() => props.updateCallback(-1)}>
                -1
            </button>
        </div>
    );
};

export default ResourcesView;
