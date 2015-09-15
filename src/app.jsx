let React = require("react");
let Main = require("./components/Main.jsx");

let Fluxxor = require("fluxxor");
let actions = require("./actions.jsx");
let HistoryStore = require("./stores/HistoryStore.jsx");
let stores = {
    HistoryStore: new HistoryStore()
};
let flux = new Fluxxor.Flux(stores, actions.methods);

React.render(
  <Main flux={flux} />,
  document.getElementById("root")
);