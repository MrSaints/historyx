let React = require("react");
let Header = require("./Header.jsx");
let Drawer = require("./Drawer.jsx");
let HistoryTable = require("./HistoryTable.jsx");

let Fluxxor = require("fluxxor");
let FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

let Main = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("HistoryStore")],
    getStateFromFlux: function() {
      let HistoryStore = this.getFlux().store("HistoryStore");
      return HistoryStore.getState();
    },
    componentDidMount: function() {
      this.getFlux().actions.loadHistory();
    },
    render: function () {
      return (
        <div className="mdl-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
          <Header selectedDay={this.state.date} />
          <Drawer selectedDay={this.state.date} />
          <main className="mdl-layout__content">
            <HistoryTable pages={this.state.pages} />
          </main>
        </div>
      );
    }
});

module.exports = Main;