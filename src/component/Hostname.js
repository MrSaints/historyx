import PropTypes from "prop-types";

const Hostname = ({ children, url }) => {
    const parser = document.createElement("a");
    parser.href = children || url;
    return parser.hostname;
};

Hostname.propTypes = {
    children: PropTypes.string,
    url: PropTypes.string,
};

export default Hostname;
