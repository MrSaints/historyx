let moment = require("moment");

let constants = {
  "CHANGE_DATE": "CHANGE_DATE",
  "LOAD_HISTORY": "LOAD_HISTORY",
  "LOAD_HISTORY_COMPLETE": "LOAD_HISTORY_COMPLETE"
};

let methods = {
  loadHistory: function (q = "", d = new Date()) {
    this.dispatch(constants.LOAD_HISTORY);
    let params = {
      text: q,
      startTime: moment(d).startOf("day").valueOf(),
      endTime: moment(d).endOf("day").valueOf()
    };
    chrome.history.search(params, function (pages) {
      //console.table(pages);
      this.dispatch(constants.LOAD_HISTORY_COMPLETE, {pages: pages});
    }.bind(this));
  },
  changeDate: function (newDate) {
    this.dispatch(constants.CHANGE_DATE, {date: newDate});
  }
};

module.exports = {
  constants: constants,
  methods: methods
};