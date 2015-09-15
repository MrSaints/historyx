let Fluxxor = require("fluxxor");
let actions = require("../actions.jsx");

let HistoryStore = Fluxxor.createStore({
  initialize: function() {
    this.loading = false;
    this.pages = [];

    this.bindActions(
      actions.constants.LOAD_HISTORY, this.onLoadHistory,
      actions.constants.LOAD_HISTORY_COMPLETE, this.onLoadHistoryComplete
    );
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
      pages: this.pages
    };
  },
});

module.exports = HistoryStore;