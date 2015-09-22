import React, {PropTypes} from "react";

const HistoryActions = React.createClass({
    render() {
        return (
            <div className="history__actions">
                <button
                    type="button"
                    className="btn btn-danger"
                    title="Delete">
                    <i className="material-icons">delete</i>
                </button>
            </div>
        );
    }
});

export default HistoryActions;