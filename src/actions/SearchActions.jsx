import Constants from "../constants/SearchConstants.jsx";

export default {
    changeQuery(q) {
        this.dispatch(Constants.CHANGE_QUERY, q);
    },
    changeDate(d) {
        this.dispatch(Constants.CHANGE_DATE, d);
    },
    changePaginate(s, e) {
        this.dispatch(Constants.CHANGE_PAGINATE, {page: s, limit: e});
    }
};