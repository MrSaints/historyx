import React, {PropTypes} from "react";
import DayPicker from "react-day-picker";
import Moment from "moment";

import Fluxxor from "fluxxor";
const FluxMixin = Fluxxor.FluxMixin(React);

const Sidebar = React.createClass({
    mixins: [FluxMixin],

    getInitialState() {
        return {date: this.props.date};
    },

    handleDayClick(e, day) {
        const today = new Date();
        if (day > today /*|| Moment(this.state.date).isSame(day, "day")*/) {
            return;
        }
        const flux = this.getFlux();
        this.setState({date: day});
        flux.actions.search.changeDate(day);
        flux.actions.search.changePaginate(0, this.props.paginate.limit);
        flux.actions.history.load(day, this.props.query);
    },

    render() {
        const modifiers = {
          "selected": (day) => Moment(this.state.date).isSame(day, "day")
        };

        return (
            <div className="sidebar col-md-2">
                <DayPicker
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick} />
            </div>
        );
    }
});

export default Sidebar;