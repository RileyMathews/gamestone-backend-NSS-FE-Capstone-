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
        <div className="border-4 flex flex-col items-center p-1 rounded-lg border-slate-900">
            <h5 className="text-xl">{props.resource_template.name}</h5>
            <p className="text-xl">{ammount}</p>
            <div className="flex gap-2">
                <button onClick={() => changeAmmount(-1)} className="text-3xl text-white border-2 border-red-600 rounded-md px-2 bg-red-500">-1</button>
                <button onClick={() => changeAmmount(1)} className="text-3xl text-white border-2 border-green-600 rounded-md px-2 bg-green-500">+1</button>
            </div>
        </div>
    )
}

export default PlayerResourceInstance
