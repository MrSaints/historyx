import React, {PropTypes} from "react";

class HistoryHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="list-group-item history__item--header">
                <h1 className="history__heading">
                    {this.props.title}
                </h1>
            </div>
        );
    }
}

export default HistoryHead;