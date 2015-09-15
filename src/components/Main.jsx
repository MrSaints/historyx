let React = require("react");
let Header = require("./Header.jsx");
let Drawer = require("./Drawer.jsx");
let HistoryTable = require("./HistoryTable.jsx");

let Main = React.createClass({
    render: function () {
      return (
        <div className="mdl-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
          <Header />
          <Drawer />
          <main className="mdl-layout__content">
            <HistoryTable />
          </main>
        </div>
      );
    }
});

module.exports = Main;