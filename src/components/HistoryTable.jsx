let React = require("react");
let HistoryHead = require("./HistoryHead.jsx");
let HistoryItem = require("./HistoryItem.jsx");

let HistoryTable = React.createClass({
  render: function () {
    return (
      <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" width="100%">
        <HistoryHead />
        <tbody>
        {this.props.pages.map(function (item) {
          return <HistoryItem key={item.id} title={item.title} url={item.url} visited={item.lastVisitTime} />
        })}
        </tbody>
      </table>
    );
  }
});

module.exports = HistoryTable;