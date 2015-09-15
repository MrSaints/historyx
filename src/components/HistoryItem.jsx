let React = require("react");
let moment = require("moment");

let HistoryItem = React.createClass({
  _truncate: function (s) {
    let newString = s.substr(0, 100);
    if (s.length > 100) {
      newString += "..."
    }
    return newString
  },
  render: function () {
    let formattedTime = moment(this.props.visited).format("hh:mm:ss A");
    if (this.props.stale) {
      formattedTime = (<em>{moment(this.props.visited).format("hh:mm A DD-MM-YYYY")}</em>);
    }
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{formattedTime}</td>
        <td className="mdl-data-table__cell--non-numeric"><img src={"chrome://favicon/" + this.props.url} /></td>
        <td className="mdl-data-table__cell--non-numeric">
          <a
            href={this.props.url}
            target="_blank"
            className="mdl-badge"
            data-badge={this.props.count}>
            {this._truncate(this.props.title || this.props.url)}
          </a>
        </td>
        <td>
          &nbsp;
        </td>
      </tr>
    );
  }
});

module.exports = HistoryItem;