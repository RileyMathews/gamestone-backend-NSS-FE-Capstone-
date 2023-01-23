import React from "react";
import { createRoot } from "react-dom/client";
import SuggestView from "./suggestGame/SuggestView";

const root = createRoot(document.getElementById("root"));
root.render(<SuggestView />);
