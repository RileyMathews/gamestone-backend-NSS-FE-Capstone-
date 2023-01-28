import { Configuration, SkyrimHelperApi } from "api-clients/src";
import Cookies from "js-cookie";
import React from "react";
import { useEffect, useState } from "react";
import Character from "./components/character";

export default function CharacterView(props) {
    const [characters, setCharacters] = useState([]);
    const [newCharacterName, setNewCharacterName] = useState("");

    const updateNewCharacterName = (event) => {
        setNewCharacterName(event.target.value);
    };

    const apiClient = new SkyrimHelperApi(
        new Configuration({
            basePath: location.origin,
            headers: {
                "X-CSRFToken": Cookies.get("csrftoken") || "",
            },
        })
    );

    useEffect(() => {
        apiClient.skyrimHelperApiPlayerCharactersList().then((r) => {
            setCharacters(r);
        });
    }, []);

    const addCharacter = (event) => {
        event.preventDefault();
        setNewCharacterName("");
        const playerCharacter = {
            name: newCharacterName,
        };
        apiClient
            .skyrimHelperApiPlayerCharactersCreate({
                playerCharacter: playerCharacter,
            })
            .then((r) => {
                setCharacters([...characters, r]);
            });
    };

    const deleteCharacter = (uuid) => {
        const newCharacters = characters.filter(character => character.uuid !== uuid)
        setCharacters(newCharacters)
        apiClient.skyrimHelperApiPlayerCharactersDestroy({uuid: uuid})
    }

    const viewCharacter = (uuid) => {
        props.selectCharacter(uuid)
    }

    return (
        <div>
            <form onSubmit={addCharacter}>
                <input
                    type="text"
                    placeholder="name"
                    onChange={updateNewCharacterName}
                    value={newCharacterName}
                />
                <input type="submit" />
            </form>
            {characters.map((character) => (
                <div>
                    <Character key={character.uuid} {...character} />
                    <button key={`delete-${character.uuid}`} onClick={() => deleteCharacter(character.uuid)}>Delete</button>
                    <button key={`view-${character.uuid}`} onClick={() => viewCharacter(character.uuid)}>View Resources</button>
                </div>
            ))}
        </div>
    );
}
