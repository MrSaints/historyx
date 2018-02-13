import React from "react";
import { connect } from "react-redux";
import { css } from "glamor";

import { Icon } from "antd";

import { isBookmarked } from "../reducer";

const styles = {
    star: css({
        color: "#5C6BC0",
    }),
};

class BookmarkIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isBookmarked) {
            return <Icon className={`${styles.star}`} type="star" />;
        }

        return null;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isBookmarked: isBookmarked(state, ownProps.url),
    };
};

export default connect(mapStateToProps)(BookmarkIcon);
