let Fluxxor = require("fluxxor");
let actions = require("../actions.jsx");

let HistoryStore = Fluxxor.createStore({
  initialize: function() {
    this.loading = false;
    this.query = "";
    this.date = new Date();
    this.pages = [];

    this.bindActions(
      actions.constants.CHANGE_QUERY, this.onChangeQuery,
      actions.constants.CHANGE_DATE, this.onChangeDate,
      actions.constants.LOAD_HISTORY, this.onLoadHistory,
      actions.constants.LOAD_HISTORY_COMPLETE, this.onLoadHistoryComplete
    );
  },
  onChangeQuery: function (payload) {
    this.query = payload.query;
    this.emit("change");
  },
  onChangeDate: function (payload) {
    this.date = payload.date;
    this.emit("change");
  },
  onLoadHistory: function() {
    this.loading = true;
    this.emit("change");
  },
  onLoadHistoryComplete: function(payload) {
      this.loading = false;

      this.pages = payload.pages;
      this.emit("change");
  },
  getState: function() {
    return {
      query: this.query,
      date: this.date,
      pages: this.pages,
      loading: this.loading
    };
  },
});

module.exports = HistoryStore;