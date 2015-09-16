import React from "react";
import Main from "./components/Main.jsx";

import Fluxxor from "fluxxor";
import Stores from "./stores/Stores.jsx";
import Actions from "./actions/Actions.jsx";
const flux = new Fluxxor.Flux(Stores, Actions);

flux.actions.history.load();

React.render(
    <Main flux={flux} />,
    document.getElementById("js-delorean")
);