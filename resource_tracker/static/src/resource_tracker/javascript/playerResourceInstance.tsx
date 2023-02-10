import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { Resource } from './types'

const PlayerResourceInstance = (props: Resource) => {
    const [ammount, setAmmount] = useState(props.current_ammount)

    const changeAmmount = (diff: number) => {
        const newAmmount = ammount + diff
        setAmmount(newAmmount)
        fetch(`${location.origin}/resource-tracker/api/player-resource-instances/${props.id}/`, {
            method: "PATCH",
            body: JSON.stringify({"current_ammount": newAmmount}),
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken") || "",
            },
        });
    }

    return (
        <aside>
            <h2>{props.resource_template.name}</h2>
            <p>{ammount}</p>
            <button onClick={() => changeAmmount(1)}>+1</button>
            <button onClick={() => changeAmmount(-1)}>-1</button>
        </aside>
    )
}

export default PlayerResourceInstance
