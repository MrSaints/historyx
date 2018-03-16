import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { css } from "glamor";

import { Icon } from "antd";

import { isBookmarked } from "../reducer";

const styles = {
    star: css({
        color: "#5C6BC0",
    }),
};

const BookmarkIcon = ({ isBookmarked }) => {
    if (isBookmarked) {
        return <Icon className={`${styles.star}`} type="star" />;
    }

    return null;
};

BookmarkIcon.propTypes = {
    isBookmarked: PropTypes.bool,
};

BookmarkIcon.defaultProps = {
    isBookmarked: false,
};

const mapStateToProps = (state, ownProps) => {
    return {
        isBookmarked: isBookmarked(state, ownProps.url),
    };
};

export default connect(mapStateToProps)(BookmarkIcon);
