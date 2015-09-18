import React, {PropTypes} from "react";
import Moment from "moment";

class HistoryItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const info = this.props.info;

        const dateTime = Moment(info.lastVisitTime);
        let formattedTime = dateTime.format("hh:mm:ss A");
        if (this.props.stale) {
            formattedTime = (<em className="text-muted" title="Last visited time">{dateTime.format("hh:mm A DD-MM-YYYY")}</em>);
        }

        const favicon = {
            background: "url(chrome://favicon/" + info.url + ") no-repeat 1.25rem",
        };

        return (
            <a href={info.url} className="list-group-item" target="_blank">
                <div className="history__date">{formattedTime}</div>
                <div className="history__url" style={favicon}>{info.title || info.url}</div>
                <div className="history__visits">
                    <span className="label label-default" title="Total visits">
                       {info.visitCount}
                    </span>
                </div>
            </a>
        );
    }
}

export default HistoryItem;