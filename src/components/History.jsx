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
        return this.props.items.slice(cursor, parseInt(cursor)+parseInt(this.props.paginate.limit));
    }

    render() {
        const items = this.getItems();
        const selectedDay = Moment(this.props.date);

        let formattedTitle = "";
        if (this.props.query !== "") {
            formattedTitle += "Searching: \"" + this.props.query + "\"";
            if (this.props.date) {
                formattedTitle += " on ";
            }
        }
        if (this.props.date) {
            formattedTitle += selectedDay.format("dddd, MMM Do YY'");
        }

        return (
            <div className="history list-group">
                <HistoryHead title={formattedTitle || "All visits"} />
                {items.map((obj, i) => {
                    return <HistoryItem
                            id={i}
                            key={obj.id}
                            info={obj}
                            stale={obj.lastVisitTime > selectedDay.endOf("day").valueOf() ? true : false} />
                })}
            </div>
        );
    }
}

export default History;