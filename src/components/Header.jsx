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
        const flux = this.getFlux();
        const q = this.state.query.trim();
        flux.actions.search.changeQuery(q);
        flux.actions.history.load(this.props.date, q);
    },

    render() {
        return (
            <header className="navbar navbar-dark navbar-fixed-top" role="banner">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">DeLorean</a>
                    <form
                        className="form-inline navbar-form pull-right"
                        onSubmit={this.handleSearchSubmit}>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search"
                            onChange={this.handleQueryChange} />
                    </form>
                </div>
            </header>
        );
    }
});

export default Header;