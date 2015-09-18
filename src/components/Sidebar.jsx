import React, {PropTypes} from "react";
import DatePicker from "react-date-picker";
import Moment from "moment";

import Fluxxor from "fluxxor";
const FluxMixin = Fluxxor.FluxMixin(React);

const Sidebar = React.createClass({
    mixins: [FluxMixin],

    getInitialState() {
        return {date: this.props.date};
    },

    handleDateChange(s, m) {
        const flux = this.getFlux();
        const date = m.toDate();
        this.setState({date: m});
        flux.actions.search.changeDate(date);
        flux.actions.search.changePaginate(0, this.props.paginate.limit);
        flux.actions.history.load(date, this.props.query);
    },

    render() {
        return (
            <div className="sidebar">
                <div className="datepicker">
                    <DatePicker
                        onChange={this.handleDateChange}
                        date={this.state.date}
                        maxDate={Moment()}
                        monthFormat="MMM" />
                </div>
            </div>
        );
    }
});

export default Sidebar;