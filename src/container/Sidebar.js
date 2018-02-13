import React from "react";
import { connect } from "react-redux";

import { Layout, Menu, Icon } from "antd";

import { loadHistory } from "../action";
import { CreateTab } from "../API";

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
                <Menu theme="dark" mode="inline">
                    <Menu.Item>
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
            </Layout.Sider>
        );
    }
}

export default connect(null, {
    loadHistory,
})(Sidebar);
