import Fluxxor from "fluxxor";
import Constants from "../constants/SearchConstants.jsx";

const SearchStore = Fluxxor.createStore({
    initialize() {
        this.state = {};
        this.state.query = "";
        this.state.date = new Date();
        this.state.paginate = {
            page: 0,
            limit: 100
        };

        this.bindActions(
            Constants.CHANGE_QUERY, this.onChangeQuery,
            Constants.CHANGE_DATE, this.onChangeDate,
            Constants.CHANGE_PAGINATE, this.onChangePaginate
        );
    },
    onChangeQuery(q) {
        this.state.query = q;
        this.emit("change");
    },
    onChangeDate(d) {
        this.state.date = d;
        this.emit("change");
    },
    onChangePaginate(payload) {
        this.state.paginate = payload;
        this.emit("change");
    },
    getState() {
        return this.state;
    }
});

export default SearchStore;