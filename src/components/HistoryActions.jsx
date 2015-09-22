import React, {PropTypes} from "react";

import Fluxxor from "fluxxor";
const FluxMixin = Fluxxor.FluxMixin(React);

const HistoryActions = React.createClass({
    mixins: [FluxMixin],

    handleDelete(e) {
        e.preventDefault();
        this.getFlux().actions.history.delete(this.props.id, this.props.url);
    },

    render() {
        return (
            <div className="history__actions">
                <button
                    type="button"
                    className="btn btn-danger"
                    title="Delete"
                    onClick={this.handleDelete}>
                    <i className="material-icons">delete</i>
                </button>
            </div>
        );
    }
});

export default HistoryActions;