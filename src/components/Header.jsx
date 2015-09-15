let React = require("react");
let moment = require("moment");

let Header = React.createClass({
  render: function () {
    let formattedDate = moment(this.props.selectedDay).format("dddd, MMM Do YY'");
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">{formattedDate}</span>
          <div className="mdl-layout-spacer"></div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
            <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <div className="mdl-textfield__expandable-holder">
              <input className="mdl-textfield__input" type="text" name="search" id="search" />
            </div>
          </div>
        </div>
      </header>
    );
  }
});

module.exports = Header;