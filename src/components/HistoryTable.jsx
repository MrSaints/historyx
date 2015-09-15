let React = require("react");
let moment = require("moment");

let HistoryHead = require("./HistoryHead.jsx");
let HistoryItem = require("./HistoryItem.jsx");

let HistoryTable = React.createClass({
  render: function () {
    let currentEnd = moment(this.props.selectedDay).endOf("day").valueOf();
    return (
      <table className="mdl-data-table mdl-shadow--2dp" width="100%">
        <HistoryHead />
        <tbody>
        {this.props.pages.map(function (item) {
          return <HistoryItem
                    key={item.id}
                    title={item.title}
                    url={item.url}
                    visited={item.lastVisitTime}
                    count={item.visitCount}
                    stale={item.lastVisitTime > currentEnd ? true : false} />
        })}
        </tbody>
      </table>
    );
  }
});

module.exports = HistoryTable;