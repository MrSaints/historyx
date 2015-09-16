import React, {PropTypes} from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import History from "./History.jsx";
import Controls from "./Controls.jsx";

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
                        <div className="content col-md-10 col-md-offset-2">
                            <Controls
                                loading={this.state.history.loading}
                                paginate={this.state.search.paginate}
                                total={this.state.history.items.length} />
                            <History
                                items={this.state.history.items}
                                date={this.state.search.date}
                                query={this.state.search.query}
                                paginate={this.state.search.paginate} />
                            <Controls
                                loading={this.state.history.loading}
                                paginate={this.state.search.paginate}
                                total={this.state.history.items.length} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Main;