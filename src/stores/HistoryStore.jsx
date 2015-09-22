import React from "react/addons";
import Fluxxor from "fluxxor";
import Constants from "../constants/HistoryConstants.jsx";

const HistoryStore = Fluxxor.createStore({
    initialize() {
        this.state = {};
        this.state.loading = false;
        this.state.items = [];

        this.bindActions(
            Constants.LOAD_HISTORY, this.onLoadHistory,
            Constants.LOAD_HISTORY_COMPLETE, this.onLoadHistoryComplete,
            Constants.DELETE_URL, this.onDeleteUrl
        );
    },
    onLoadHistory() {
        this.state.loading = true;
        this.emit("change");
    },
    onLoadHistoryComplete(obj) {
        this.state.loading = false;
        this.state.items = obj;
        this.emit("change");
    },
    onDeleteUrl(id) {
        this.state.items = React.addons.update(this.state.items, {
            $splice: [[id, 1]]
        });
        this.emit("change");
    },
    getState() {
        return this.state;
    }
});

export default HistoryStore;