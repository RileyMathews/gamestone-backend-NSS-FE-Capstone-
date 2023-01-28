import { Configuration, SkyrimHelperApi, PlayerCharacter } from "api-clients/src";
import Cookies from "js-cookie";
import React from "react";
import { useEffect, useState } from "react"

const ResourcesView = ({uuid}: {uuid: string}) => {
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

    return (
        <div>
            {loading ?
                <h1>Loading...</h1>
                :
                <div>
                    <h3>{character.name}    </h3>
                </div>
            }
        </div>
    )
}

export default ResourcesView
