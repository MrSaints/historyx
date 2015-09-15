let React = require("react");

let Fluxxor = require("fluxxor");
let FluxMixin = Fluxxor.FluxMixin(React);

let moment = require("moment");
let DayPicker = require("react-day-picker");

let Drawer = React.createClass({
  mixins: [FluxMixin],
  handleDayClick: function (e, day) {
    let currentDate = new Date();
    if (day > currentDate) {
      return false;
    }
    this.getFlux().actions.changeDate(day);
    this.getFlux().actions.loadHistory("", day);
  },
  render: function () {
    let drawerStyle = {
      position: "fixed"
    };
    let modifiers = {
      "selected": (day) => moment(this.props.selectedDay).isSame(day)
    };

    return (
      <div className="mdl-layout__drawer" style={drawerStyle}>
        <span className="mdl-layout-title">Delorean</span>
        <div>
          <DayPicker
            modifiers={ modifiers }
            onDayClick={ this.handleDayClick } />
        </div>
        <nav className="mdl-navigation">
          <a className="mdl-navigation__link" href="#">About</a>
        </nav>
      </div>
    );
  }
});

module.exports = Drawer;