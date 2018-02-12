import React from "react";
import { css } from "glamor";

import { Layout, Row, Col } from "antd";

import Toolbar from "./Toolbar";
import History from "./History";

const styles = {
    wrapper: css({
        padding: "50px",
    }),
    content: css({
        " .ant-table": css({
            background: "#FFF",
            tableLayout: "fixed",
        }),
    }),
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <Layout.Header>
                    <Row gutter={8}>
                        <Col span={4}>
                            <a href="#">
                                History<sup>&chi;3</sup>
                            </a>
                        </Col>

                        <Col span={16}>
                            <Toolbar />
                        </Col>
                    </Row>
                </Layout.Header>

                <Layout.Content className={`${styles.wrapper}`}>
                    <div className={`${styles.content}`}>
                        <History />
                    </div>
                </Layout.Content>
            </Layout>
        );
    }
}
