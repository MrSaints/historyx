import React from "react";
import { css } from "glamor";

import { Layout, Row, Col } from "antd";

import Toolbar from "./Toolbar";
import History from "./History";

const styles = {
    header: css({
        background: "#3F51B5"
    }),
    sourceLink: css({
        color: "#FFF",
    }),
    content: css({
        padding: "50px",
    }),
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <Layout.Header className={`${styles.header}`}>
                    <Row gutter={8}>
                        <Col span={4}>
                            <a
                                className={`${styles.sourceLink}`}
                                href="https://github.com/MrSaints/historyx"
                                rel="noopener noreferrer"
                                target="_blank"
                                title="HistoryX Source">
                                History<sup>&chi;3</sup>
                            </a>
                        </Col>

                        <Col span={16}>
                            <Toolbar />
                        </Col>
                    </Row>
                </Layout.Header>

                <Layout.Content className={`${styles.content}`}>
                    <History />
                </Layout.Content>
            </Layout>
        );
    }
}
