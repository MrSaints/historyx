import Constants from "../constants/HistoryConstants.jsx";
import {searchHistory} from "../utils/ChromeAPI.jsx";

import Moment from "moment";

export default {
    load(d = new Date(), q = "") {
        this.dispatch(Constants.LOAD_HISTORY);

        let start = d,
            end = false;

        if (d !== 0) {
            start = Moment(d).startOf("day").valueOf();
            end = Moment(d).endOf("day").valueOf();
        }

        searchHistory(q, start, end)
            .then(HistoryItems => {
                this.dispatch(Constants.LOAD_HISTORY_COMPLETE, HistoryItems);
            });
    }
};