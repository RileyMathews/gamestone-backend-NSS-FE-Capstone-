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
            <Resource name={"ore"} ammount={character.ore} tailwindColor={"zinc"} updateCallback={(am) => updateResource("ore", am)} />
            <Resource name={"soul gems"} ammount={character.soul_gems} tailwindColor={"violet"} updateCallback={(am) => updateResource("soul_gems", am)} />
            <Resource name={"plants"} ammount={character.plants} tailwindColor={"green"} updateCallback={(am) => updateResource("plants", am)} />
            <Resource name={"septims"} ammount={character.septims} tailwindColor={"yellow"} updateCallback={(am) => updateResource("septims", am)} />
            <Resource name={"experience"} ammount={character.experience} tailwindColor={"sky"} updateCallback={(am) => updateResource("experience", am)} />
        </div>
    );
};

interface ResourceProps {
    name: string;
    ammount: number;
    updateCallback: CallableFunction;
    tailwindColor: string;
}

const Resource = (props: ResourceProps) => {
    return (
        <div className="border-4 flex flex-col mb-1">
            <p className="text-lg self-center">
                {props.name}: {props.ammount}{" "}
            </p>
            <button className={`text-white border-2 border-${props.tailwindColor}-600 rounded-md px-2 bg-${props.tailwindColor}-500 active:bg-${props.tailwindColor}-900 my-1`} onClick={() => props.updateCallback(1)}>
                +1
            </button>
            <button className={`text-white border-2 border-${props.tailwindColor}-600 rounded-md px-2 bg-${props.tailwindColor}-500 active:bg-${props.tailwindColor}-900 mt-1`} onClick={() => props.updateCallback(-1)}>
                -1
            </button>
        </div>
    );
};

export default ResourcesView;
