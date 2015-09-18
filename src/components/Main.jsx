import React, {PropTypes} from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import Paginator from "./Paginator.jsx";
import History from "./History.jsx";
import Loader from "./Loader.jsx";

import Fluxxor, { StoreWatchMixin } from "fluxxor";
const FluxMixin = Fluxxor.FluxMixin(React);

const Main = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("history", "search")],

    getStateFromFlux() {
        const flux = this.getFlux();
        return {
            history: flux.store("history").getState(),
            search: flux.store("search").getState()
        };
    },

    render() {
        let results = (
            <div>
            <Paginator
                paginate={this.state.search.paginate}
                total={this.state.history.items.length} />
            <History
                items={this.state.history.items}
                date={this.state.search.date}
                query={this.state.search.query}
                paginate={this.state.search.paginate} />
            <Paginator
                paginate={this.state.search.paginate}
                total={this.state.history.items.length} />
            </div>
        );
        if (this.state.history.items.length === 0) {
            results = (
                <div className="alert alert-warning" role="alert">
                    <strong>No results found.</strong>
                    {this.state.search.query !== "" ? " You searched for: \"" + this.state.search.query + "\"" : null}
                </div>
            );
        }
        return (
            <div>
                <Header
                    date={this.state.search.date}
                    query={this.state.search.query} />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar
                            date={this.state.search.date}
                            query={this.state.search.query}
                            paginate={this.state.search.paginate} />
                        <div className="content">
                            {results}
                        </div>
                    </div>
                </div>
                <Loader status={this.state.history.loading} />
            </div>
        );
    }
});

export default Main;