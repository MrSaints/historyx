let React = require("react");
let moment = require("moment");

let HistoryItem = React.createClass({
  statics: {
    truncate: function (s) {
      let newString = s.substr(0, 100);
      if (s.length > 100) {
        newString += "..."
      }
      return newString
    },
    getTime: function (t) {
      return moment(t).format("HH:mm:ss");
    }
  },
  render: function () {
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.constructor.getTime(this.props.visited)}</td>
        <td className="mdl-data-table__cell--non-numeric"><img src={"chrome://favicon/" + this.props.url} /></td>
        <td className="mdl-data-table__cell--non-numeric">
          <a href={this.props.url} target="_blank">{this.constructor.truncate(this.props.title || this.props.url)}</a>
        </td>
      </tr>
    );
  }
});

module.exports = HistoryItem;