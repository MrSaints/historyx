let React = require("react");
let HistoryHead = require("./HistoryHead.jsx");
let HistoryItem = require("./HistoryItem.jsx");

let HistoryTable = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  componentDidMount: function () {
    chrome.history.search({ text: "" }, function (items) {
      console.table(items);
      this.setState({ data: items });
    }.bind(this));
  },
  render: function () {
    return (
      <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" width="100%">
        <HistoryHead />
        <tbody>
        {this.state.data.map(function (item) {
          return <HistoryItem key={item.id} title={item.title} url={item.url} visited={item.lastVisitTime} />
        })}
        </tbody>
      </table>
    );
  }
});

module.exports = HistoryTable;