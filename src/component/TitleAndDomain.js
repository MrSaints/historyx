import React from "react";
import { css } from "glamor";

import { Badge } from "antd";

const styles = {
    wrapper: css({
        alignItems: "center",
        display: "flex",
    }),
    link: css({
        position: "absolute",
        height: "100%",
        width: "100%",
    }),
    title: css({
        width: 0,
        flexGrow: "1",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }),
    meta: css({
        flexShrink: 0,
        marginLeft: "1rem",
    }),
    domain: css({
        color: "rgba(0, 0, 0, .5)",
        fontSize: ".8rem",
    }),
};

const TitleAndDomain = ({ title, domain, visitCount = 0 }) => {
    const parser = document.createElement("a");
    parser.href = domain;

    return (
        <div {...styles.wrapper}>
            <a {...styles.link} href={domain} />
            <div {...styles.title}>{title || domain}</div>
            <div {...styles.meta}>
                <Badge count={visitCount} style={{ backgroundColor: "#5C6BC0" }} />
            </div>
            <div {...styles.meta} {...styles.domain}>
                {parser.hostname}
            </div>
        </div>
    );
};

export default TitleAndDomain;
