let React = require("react");
let moment = require("moment");

let ProgressBar = require("./ProgressBar.jsx");

let Fluxxor = require("fluxxor");
let FluxMixin = Fluxxor.FluxMixin(React);

let Header = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function () {
    return { query: this.props.query };
  },
  handleChange: function (e) {
    this.setState({query: e.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    let q = this.state.query.trim();
    this.getFlux().actions.changeQuery(q);
    this.getFlux().actions.loadHistory(q, this.props.selectedDay);
  },
  render: function () {
    let headerStyle = {
      position: "fixed"
    };
    let formattedTitle = "";
    if (this.props.query !== "") {
      formattedTitle += "Searching: \"" + this.props.query + "\"";
      if (this.props.selectedDay) {
        formattedTitle += " on ";
      }
    }
    formattedTitle += moment(this.props.selectedDay).format("dddd, MMM Do YY'");
    return (
      <header className="mdl-layout__header" style={headerStyle}>
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">{formattedTitle}</span>
          <div className="mdl-layout-spacer"></div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
            <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <div className="mdl-textfield__expandable-holder">
              <form onSubmit={this.handleSubmit}>
                <input
                      className="mdl-textfield__input"
                      type="text"
                      name="search"
                      id="search"
                      value={this.state.query}
                      onChange={this.handleChange} />
              </form>
            </div>
          </div>
        </div>
        {this.props.loading ? <ProgressBar /> : null}
      </header>
    );
  }
});

module.exports = Header;