import React from "react";
import PropTypes from "prop-types";

import distanceInWordsStrict from "date-fns/distance_in_words_strict";
import fnsFormat from "date-fns/format";
import isAfter from "date-fns/is_after";
import isValid from "date-fns/is_valid";
import parse from "date-fns/parse";
import subMonths from "date-fns/sub_months";

const DateFormat = ({ children, format, humanizeRecent, ...otherProps }) => {
    if (!children) {
        return null;
    }

    const parsedDate = parse(children);
    if (!isValid(parsedDate)) {
        return null;
    }

    const isRecent = isAfter(parsedDate, subMonths(new Date(), 1));
    const opts = {
        addSuffix: true,
    };

    return (
        <span {...otherProps} title={fnsFormat(parsedDate)}>
            {humanizeRecent && isRecent
                ? distanceInWordsStrict(new Date(), parsedDate, opts)
                : fnsFormat(parsedDate, format)}
        </span>
    );
};

DateFormat.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    format: PropTypes.string,
    humanizeRecent: PropTypes.bool,
};

DateFormat.defaultProps = {
    format: "DD-MM-YYYY",
    humanizeRecent: false,
};

export default DateFormat;
