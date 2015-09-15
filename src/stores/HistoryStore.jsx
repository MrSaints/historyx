let Fluxxor = require("fluxxor");
let actions = require("../actions.jsx");

let HistoryStore = Fluxxor.createStore({
  initialize: function() {
    this.loading = false;
    this.date = new Date();
    this.pages = [];

    this.bindActions(
      actions.constants.CHANGE_DATE, this.onChangeDate,
      actions.constants.LOAD_HISTORY, this.onLoadHistory,
      actions.constants.LOAD_HISTORY_COMPLETE, this.onLoadHistoryComplete
    );
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
      date: this.date,
      pages: this.pages
    };
  },
});

module.exports = HistoryStore;