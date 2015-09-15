let React = require("react");

let DayPicker = require("react-day-picker");
let { isSameDay } = require("react-day-picker/lib/Utils");

let Drawer = React.createClass({
  getInitialState: function () {
    return {
      selectedDay: new Date()
    };
  },
  handleDayClick: function (e, day) {
    let currentDate = new Date();
    if (day > currentDate) {
      return false;
    }
    this.setState({
      selectedDay: day
    });
  },
  render: function () {
    let { selectedDay } = this.state;
    let drawerStyle = {
      position: "fixed"
    };
    let modifiers = {
      "selected": (day) => isSameDay(selectedDay, day)
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