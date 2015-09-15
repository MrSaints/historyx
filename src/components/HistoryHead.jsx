let React = require("react");

let HistoryHead = React.createClass({
  render: function () {
    return (
      <thead>
        <tr>
          <th className="mdl-data-table__cell--non-numeric">Last Visited</th>
          <th className="mdl-data-table__cell--non-numeric" colSpan="2">Page</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
    );
  }
});

module.exports = HistoryHead;