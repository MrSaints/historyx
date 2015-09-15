let moment = require("moment");

let constants = {
  "CHANGE_QUERY": "CHANGE_QUERY",
  "CHANGE_DATE": "CHANGE_DATE",
  "LOAD_HISTORY": "LOAD_HISTORY",
  "LOAD_HISTORY_COMPLETE": "LOAD_HISTORY_COMPLETE"
};

let methods = {
  loadHistory: function (q = "", d = new Date()) {
    this.dispatch(constants.LOAD_HISTORY);
    let params = {
      text: q
      //, maxResults: 0
    };
    if (d) {
      params["startTime"] = moment(d).startOf("day").valueOf();
      params["endTime"] = moment(d).endOf("day").valueOf();
    }
    chrome.history.search(params, function (pages) {
      //console.table(pages);
      this.dispatch(constants.LOAD_HISTORY_COMPLETE, {pages: pages});
    }.bind(this));
  },
  changeQuery: function (q) {
    this.dispatch(constants.CHANGE_QUERY, {query: q});
  },
  changeDate: function (newDate) {
    this.dispatch(constants.CHANGE_DATE, {date: newDate});
  }
};

module.exports = {
  constants: constants,
  methods: methods
};