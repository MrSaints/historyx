import React, {PropTypes} from "react";
import Moment from "moment";

class HistoryItem extends React.Component {
    constructor(props) {
        super(props);
    }

    _truncate(s, limit = 100) {
        let t = s.substr(0, limit);
        if (s.length > limit) {
          t += "...";
        }
        return t;
    }

    render() {
        const info = this.props.info;
        const itemUrlStyle = {
            background: "url(chrome://favicon/" + info.url + ") no-repeat 0.75rem",
            paddingLeft: "2.5rem"
        }
        const dateTime = Moment(info.lastVisitTime);
        let formattedTime = dateTime.format("hh:mm:ss A");
        if (this.props.stale) {
            formattedTime = (<em className="text-muted" title="Last visited time">{dateTime.format("hh:mm A DD-MM-YYYY")}</em>);
        }
        return (
            <tr>
                <td>{formattedTime}</td>
                <td style={itemUrlStyle}>
                    <a href="{info.url}">
                        {this._truncate(info.title || info.url)}
                    </a>
                    &nbsp;<small className="text-muted" title="Total visits">[{info.visitCount}]</small>
                </td>
            </tr>
        );
    }
}

export default HistoryItem;