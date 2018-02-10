import React from "react";

import fnsFormat from "date-fns/format";
import isValid from "date-fns/is_valid";
import parse from "date-fns/parse";

const DateFormat = ({ children, format = "DD-MM-YYYY" }) => {
    if (!children) {
        return null;
    }

    const parsedDate = parse(children);
    if (!isValid(parsedDate)) {
        return null;
    }

    return (
        <span title={fnsFormat(parsedDate)}>
            {fnsFormat(parsedDate, format)}
        </span>
    );
};

export default DateFormat;
