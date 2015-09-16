import Fluxxor from "fluxxor";
import Constants from "../constants/HistoryConstants.jsx";

const HistoryStore = Fluxxor.createStore({
    initialize() {
        this.state = {};
        this.state.loading = false;
        this.state.items = [];

        this.bindActions(
            Constants.LOAD_HISTORY, this.onLoadHistory,
            Constants.LOAD_HISTORY_COMPLETE, this.onLoadHistoryComplete
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
    getState() {
        return this.state;
    }
});

export default HistoryStore;