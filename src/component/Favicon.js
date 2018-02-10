import React from "react";

const Favicon = ({ children }) => {
    if (!children) {
        return null;
    }

    return <img src={`chrome://favicon/${children}`} />;
};

export default Favicon;
