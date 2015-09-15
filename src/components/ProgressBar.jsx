let React = require("react");

let ProgressBar = React.createClass({
    render: function () {
        let loaderStyle = {
            width: "100%"
        };
        let bar1Style = {
            width: "0%"
        };
        let bar2Style = {
            width: "100%"
        };
        let bar3Style = bar1Style;
        return (
            <div
                className="mdl-progress mdl-progress__indeterminate is-upgraded"
                style={loaderStyle}>
                <div className="progressbar bar bar1" style={bar1Style}></div>
                <div className="bufferbar bar bar2" style={bar2Style}></div>
                <div className="auxbar bar bar3" style={bar3Style}></div>
            </div>
        );
    }
});

module.exports = ProgressBar;