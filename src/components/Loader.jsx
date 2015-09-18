import React, {PropTypes} from "react";

class Loader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Source: http://codepen.io/brunjo/pen/xbwVXJ
        const loader = (
            <div className="loader">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        );
        return this.props.status ? loader : null;
    }
}

export default Loader;