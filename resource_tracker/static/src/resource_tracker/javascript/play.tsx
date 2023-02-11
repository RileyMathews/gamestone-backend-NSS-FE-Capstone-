import React from "react";
import ReactDOM from "react-dom/client"
import PlayerResourceInstance from "./playerResourceInstance";
import { Resource } from "./types";



const resources: Resource[] = JSON.parse(document.getElementById("resources-data").textContent)

const root = ReactDOM.createRoot(document.getElementById("react-mount"))
root.render(
    <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {resources.map(resource => <PlayerResourceInstance {...resource} key={resource.id} />)}
    </section>
)
