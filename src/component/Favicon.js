import React from "react";
import PropTypes from "prop-types";

const Favicon = ({ children, ...otherProps }) => {
    if (!children) {
        return null;
    }

    return <img {...otherProps} src={`chrome://favicon/${children}`} />;
};

Favicon.propTypes = {
    children: PropTypes.string.isRequired,
};

export default Favicon;
