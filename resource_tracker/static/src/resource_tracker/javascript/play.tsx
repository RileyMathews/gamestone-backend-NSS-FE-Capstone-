import React from "react";
import ReactDOM from "react-dom/client"
import Dice from "./dice";
import PlayerResourceInstance from "./playerResourceInstance";
import { Resource, Die } from "./types";



const resources: Resource[] = JSON.parse(document.getElementById("resources-data").textContent)
const dice: Die[] = JSON.parse(document.getElementById("dice-data").textContent)
console.log(dice)

const root = ReactDOM.createRoot(document.getElementById("react-mount"))
root.render(
    <div>
        <section className="grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
            {resources.map(resource => <PlayerResourceInstance {...resource} key={resource.id} />)}
        </section>
        <section>
            <Dice dice={dice}/>
        </section>
    </div>
)
