import React, {PropTypes} from "react";

import Fluxxor from "fluxxor";
const FluxMixin = Fluxxor.FluxMixin(React);

const Header = React.createClass({
    mixins: [FluxMixin],

    getInitialState() {
        return {query: this.props.query};
    },

    handleQueryChange(e) {
        this.setState({query: e.target.value});
    },

    handleSearchSubmit(e) {
        e.preventDefault();
        const actions = this.getFlux().actions;
        const q = this.state.query.trim();
        actions.search.changePaginate(0, this.props.limit);
        actions.search.changeQuery(q);
        actions.history.load(this.props.date, q);
    },

    handleClear(e) {
        e.preventDefault();
        this.setState({query: ""});
        if (this.props.query === "") {
            return;
        }
        const actions = this.getFlux().actions;
        actions.search.changeQuery("");
        actions.history.load(this.props.date);
    },

    render() {
        const clearButton = (
            <span className="input-group-btn">
                <button
                    className="btn btn-danger"
                    type="button"
                    onClick={this.handleClear}>
                    <i className="material-icons">clear</i>
                </button>
            </span>
        );
        return (
            <header
                className="navbar navbar-dark navbar-fixed-top"
                role="banner">
                <div className="container-fluid">
                    <a
                        className="navbar-brand"
                        href="https://github.com/MrSaints/historyx"
                        target="_blank"
                        title="HistoryX Source">
                        History<sup>&chi;</sup>
                    </a>
                    <form
                        className="form-inline navbar-form pull-right"
                        onSubmit={this.handleSearchSubmit}>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search"
                                tabIndex="1"
                                value={this.state.query}
                                onChange={this.handleQueryChange} />
                            {this.state.query.length > 0 ? clearButton : null}
                        </div>
                    </form>
                </div>
            </header>
        );
    }
});

export default Header;