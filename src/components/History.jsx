import React, {PropTypes} from "react";
import Moment from "moment";
import HistoryItem from "./HistoryItem.jsx";
import HistoryHead from "./HistoryHead.jsx";

class History extends React.Component {
    constructor(props) {
        super(props);
    }

    getItems() {
        if (parseInt(this.props.paginate.limit) === 0) {
            return this.props.items;
        }
        const cursor = this.props.paginate.page * this.props.paginate.limit;
        return this.props.items.slice(cursor, cursor + this.props.paginate.limit);
    }

    render() {
        const items = this.getItems();
        const selectedDay = Moment(this.props.date);
        const selectedDayEnd = selectedDay.endOf("day").valueOf();
        let formattedTitle = "";
        if (this.props.query !== "") {
            formattedTitle += "Searching: \"" + this.props.query + "\" on ";
        }
        formattedTitle += selectedDay.format("dddd, MMM Do YY'");

        return (
            <table className="table table-bordered table-hover">
                <HistoryHead title={formattedTitle} />
                <tbody>
                {items.map(obj => {
                    return <HistoryItem
                            key={obj.id}
                            info={obj}
                            stale={obj.lastVisitTime > selectedDayEnd ? true : false} />
                })}
                </tbody>
            </table>
        );
    }
}

export default History;