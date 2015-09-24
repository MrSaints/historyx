import React, {PropTypes} from "react";
import DatePicker from "react-date-picker";
import Moment from "moment";

import Fluxxor from "fluxxor";
const FluxMixin = Fluxxor.FluxMixin(React);

const Sidebar = React.createClass({
    mixins: [FluxMixin],

    /*getInitialState() {
        return {date: this.props.date};
    },*/

    handleDateChange(s, m) {
        const flux = this.getFlux();
        let date = m.toDate();
        //this.setState({date: m});
        if (m.isSame(this.props.date, "day")) {
            date = 0;
        }
        flux.actions.search.changeDate(date);
        flux.actions.search.changePaginate(0, this.props.paginate.limit);
        flux.actions.history.load(date, this.props.query);
    },

    render() {
        const weekDayNames = ['S','M','T','W','T','F','S'];
        return (
            <div className="sidebar">
                <div className="datepicker">
                    <DatePicker
                        onChange={this.handleDateChange}
                        weekDayNames={weekDayNames}
                        date={this.props.date}
                        maxDate={Moment()}
                        monthFormat="MMM" />
                </div>
            </div>
        );
    }
});

export default Sidebar;