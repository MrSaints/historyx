let constants = {
  "LOAD_HISTORY": "LOAD_HISTORY",
  "LOAD_HISTORY_COMPLETE": "LOAD_HISTORY_COMPLETE"
};

let methods = {
  loadHistory: function () {
    this.dispatch(constants.LOAD_HISTORY);

    chrome.history.search({ text: "" }, function (pages) {
      console.table(pages);
      this.dispatch(constants.LOAD_HISTORY_COMPLETE, {pages: pages});
    }.bind(this));
  }
};

module.exports = {
  constants: constants,
  methods: methods
};