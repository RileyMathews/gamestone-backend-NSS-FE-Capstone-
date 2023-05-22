import React from "react";
import ReactDOM from "react-dom/client";
import ResourcesView from "./resourcesView";

const playerCharacter = JSON.parse(document.getElementById("player_character").textContent);

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("react-mount"));
root.render(<ResourcesView {...playerCharacter} />);
