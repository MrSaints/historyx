import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { css } from "glamor";

import { Layout, Menu, Icon } from "antd";

import { loadHistory } from "../action";
import { CreateTab } from "../API";

// eslint-disable-next-line no-undef
const version = process.env.VERSION;

const styles = {
    version: css({
        color: "#f0f2f5",
        fontSize: ".8rem",
        padding: "1rem",
        textAlign: "center",
    }),
};

class Sidebar extends React.Component {
    handleReload = () => {
        this.props.loadHistory("", 0, null, 0, false);
    };

    handleClear = () => {
        CreateTab({ url: "chrome://settings/clearBrowserData" });
    };

    render() {
        return (
            <Layout.Sider
                collapsible
                collapsedWidth={0}
                defaultCollapsed={true}
            >
                <Menu mode="inline" selectedKeys={[]} theme="dark">
                    <Menu.Item disabled={this.props.isLoading}>
                        <span onClick={this.handleReload}>
                            <Icon type="reload" /> Reload
                        </span>
                    </Menu.Item>
                    <Menu.Item>
                        <span onClick={this.handleClear}>
                            <Icon type="export" /> Clear Browsing Data
                        </span>
                    </Menu.Item>
                </Menu>

                {version && <div {...styles.version}>Version {version}</div>}
            </Layout.Sider>
        );
    }
}

Sidebar.propTypes = {
    isLoading: PropTypes.bool,
    loadHistory: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
    isLoading: true,
};

const mapStateToProps = state => {
    return {
        isLoading: state.history.isLoading,
    };
};

export default connect(mapStateToProps, {
    loadHistory,
})(Sidebar);
