import React from "react";
import { createRoot } from "react-dom/client";
import GamesView from "./profile/ProfileView";

const root = createRoot(document.getElementById("root"));
root.render(<GamesView />);
