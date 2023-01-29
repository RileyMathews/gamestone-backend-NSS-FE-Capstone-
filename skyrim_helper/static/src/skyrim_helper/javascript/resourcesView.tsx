import { Configuration, SkyrimHelperApi, PlayerCharacter } from "api-clients/src";
import Cookies from "js-cookie";
import React from "react";
import { useEffect, useState } from "react"

const ResourcesView = ({uuid, clearCharacter}: {uuid: string, clearCharacter: CallableFunction}) => {
    const apiClient = new SkyrimHelperApi(
        new Configuration({
            basePath: location.origin,
            headers: {
                "X-CSRFToken": Cookies.get("csrftoken") || "",
            },
        })
    );

    const [loading, setLoading] = useState(true)
    const [character, setCharacter] = useState()

    useEffect(() => {
        apiClient.skyrimHelperApiPlayerCharactersRetrieve({uuid: uuid})
            .then(playerCharacter => {
                setCharacter(playerCharacter)
                setLoading(false)
            })
    }, [])

    const updateResource = (resourceName: string, ammount) => {
        const player = {...character}
        player[resourceName] += ammount
        if (player[resourceName] < 0) {
            return
        }
        setCharacter(player)
        apiClient.skyrimHelperApiPlayerCharactersUpdate({uuid: uuid, playerCharacter: player})
    }

    return (
        <div>
            {loading ?
                <h1>Loading...</h1>
                :
                <div>
                    <h3>{character.name}</h3>
                    <p>ores: {character.ore} <button onClick={() => updateResource("ore", 1)}>+1</button><button onClick={() => updateResource("ore", -1)}>-1</button></p>
                    <p>soul gems: {character.soulGems} <button onClick={() => updateResource("soulGems", 1)}>+1</button><button onClick={() => updateResource("soulGems", -1)}>-1</button></p>
                    <p>plants: {character.plants} <button onClick={() => updateResource("plants", 1)}>+1</button><button onClick={() => updateResource("plants", -1)}>-1</button></p>
                    <p>septims: {character.septims} <button onClick={() => updateResource("septims", 1)}>+1</button><button onClick={() => updateResource("septims", -1)}>-1</button></p>
                    <p>experience: {character.experience} <button onClick={() => updateResource("experience", 1)}>+1</button><button onClick={() => updateResource("experience", -1)}>-1</button></p>
                    <div>
                        <button onClick={clearCharacter}>All characters</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ResourcesView
