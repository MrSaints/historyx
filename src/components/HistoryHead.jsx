import React, {PropTypes} from "react";

class HistoryHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <thead>
                <tr>
                    <th colSpan="2">{this.props.title}</th>
                </tr>
            </thead>
        );
    }
}

export default HistoryHead;