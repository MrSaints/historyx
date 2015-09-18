import React, {PropTypes} from "react";

import Fluxxor from "fluxxor";
const FluxMixin = Fluxxor.FluxMixin(React);

const Paginator = React.createClass({
    mixins: [FluxMixin],

    handleLimitChange(e) {
        e.preventDefault();
        //this.setState({limit: e.target.value});
        this.getFlux().actions.search.changePaginate(0, e.target.value);
    },

    handlePrevPage(e) {
        e.preventDefault();
        if (this.props.paginate.page === 0) {
            return;
        }
        this.getFlux().actions.search.changePaginate(this.props.paginate.page - 1, this.props.paginate.limit);
    },

    handleNextPage(e) {
        e.preventDefault();
        const nextPage = this.props.paginate.page+1;
        if (nextPage > Math.floor(this.props.total / this.props.paginate.limit)) {
            return;
        }
        this.getFlux().actions.search.changePaginate(nextPage, this.props.paginate.limit);
    },

    render() {
        const cursor = this.props.paginate.page * this.props.paginate.limit;
        const end = cursor + parseInt(this.props.paginate.limit);

        return (
            <div className="paginator">
            {this.props.loading ? <div className="spinner-loader pull-left">Loading...</div> : null}
            <form className="form-inline">
                <div className="form-group paginator__block">
                    <label htmlFor="limit-selector">View </label>
                    <select
                        id="limit-selector"
                        className="c-select paginator__select"
                        onChange={this.handleLimitChange}
                        value={this.props.paginate.limit}>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="500">500</option>
                        <option value="0">All</option>
                    </select>
                </div>
                <div className="form-group paginator__block">
                    {cursor+1}-{!end || end >= this.props.total ? this.props.total : end}
                    &nbsp;of {this.props.total}
                </div>
                <div className="form-group paginator__block">
                    <div className="btn-group" role="group">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            disabled={this.props.paginate.page === 0}
                            onClick={this.handlePrevPage}>
                            <i className="material-icons">keyboard_arrow_left</i>
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            disabled={this.props.paginate.page + 1 > Math.floor(this.props.total / this.props.paginate.limit)}
                            onClick={this.handleNextPage}>
                            <i className="material-icons">keyboard_arrow_right</i>
                        </button>
                    </div>
                </div>
            </form>
            </div>
        );
    }
});

export default Paginator;