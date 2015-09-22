import React, {PropTypes} from "react";
import Moment from "moment";
import HistoryActions from "./HistoryActions.jsx";

class HistoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showActions: false};
        this.showActions = this.showActions.bind(this);
        this.hideActions = this.hideActions.bind(this);
    }

    showActions(e) {
        this.setState({showActions: true});
    }

    hideActions(e) {
        this.setState({showActions: false});
    }

    render() {
        const info = this.props.info;

        let tokens = "hh:mm:ss A";
        if (this.props.stale) {
            tokens = "hh:mm A, DD-MM-YYYY";
        }

        const favicon = {
            background: "url(chrome://favicon/" + info.url + ") no-repeat 1.25rem",
        };

        return (
            <a
                href={info.url}
                className="list-group-item history__item"
                target="_blank"
                onMouseEnter={this.showActions}
                onMouseLeave={this.hideActions}>
                <div className="history__date text-muted" title="Date / time of last visit">
                    {Moment(info.lastVisitTime).format(tokens)}
                </div>
                <div className="history__info" style={favicon}>
                    <div className="history__title truncate">{info.title || "Untitled"}</div>
                    <div className="history__url text-muted truncate">
                        <small>{info.url}</small>
                    </div>
                </div>
                {this.state.showActions ? <HistoryActions id={this.props.id} url={info.url} /> : null}
                <div className="history__visits">
                    <span className="label label-history" title="Total visits">
                       {info.visitCount}
                    </span>
                </div>
            </a>
        );
    }
}

export default HistoryItem;