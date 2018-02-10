import React from "react";
import * as R from "ramda";
import { css } from "glamor";

import { Layout, Row, Col, Input, DatePicker, Button, Icon, Modal } from "antd";

import DateFormat from "../component/DateFormat";
import HistoryTable from "../component/HistoryTable";

import { Search, DeleteURL } from "../API";

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
    filters: css({
        alignItems: "center",
        display: "flex !important",
        height: "64px",
    }),
    toolbar: css({
        display: "block !important",
        textAlign: "center",
    }),
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.defaultState = {
            query: "",

            startTime: 0,
            endTime: null,
            dateRange: [],

            selectedUrls: [],
            selectedRowKeys: [],

            loading: true,
        };
        this.state = this.defaultState;
    }

    componentDidMount = async () => {
        this.search(this.state);
    };

    handleQueryChange = e => {
        this.setState({ query: e.target.value });
    };

    handleSearch = query => {
        this.search({
            ...this.state,
            query,
        });
    };

    handleDateSelection = date => {
        const [startDate, endDate] = date;
        this.setState(
            {
                dateRange: date,
                startTime: startDate
                    ? startDate.startOf("day").valueOf()
                    : this.defaultState.startTime,
                endTime: endDate
                    ? endDate.endOf("day").valueOf()
                    : this.defaultState.endTime,
            },
            () => {
                this.search(this.state);
            }
        );
    };

    handleClear = () => {
        this.setState(this.defaultState, () => {
            this.search(this.state);
        });
    };

    hasFiltersSet = () => {
        const pickFilters = R.pick(["query", "startTime", "endTime"]);

        if (R.equals(pickFilters(this.state), pickFilters(this.defaultState))) {
            return false;
        }

        return true;
    };

    handleRowSelection = (selectedRowKeys, selectedRows) => {
        const selectedUrls = R.map(R.prop("url"), selectedRows);
        this.setState({
            selectedRowKeys,
            selectedUrls,
        });
    };

    handleDeleteSelections = () => {
        const urlsToDelete = this.state.selectedUrls;
        Modal.confirm({
            title: "Remove selected items",
            content:
                "Are you sure that you want to delete these pages from your history?",
            okText: "Remove",
            cancelText: "Cancel",
            onOk: async () => {
                await Promise.all(urlsToDelete.map(url => DeleteURL(url)));
                this.handleCancelSelections();
                this.search(this.state);
            },
        });
    };

    handleCancelSelections = () => {
        this.setState({
            selectedRowKeys: this.defaultState.selectedRowKeys,
            selectedUrls: this.defaultState.selectedUrls,
        });
    };

    hasSelections = () => {
        return this.state.selectedUrls.length > 0;
    };

    getTitle = () => {
        const { query, startTime, endTime } = this.state;

        const isEmptyNil = R.either(R.isEmpty, R.isNil);
        const hasQuery = !isEmptyNil(query);
        const hasDateRange = !isEmptyNil(startTime) && !isEmptyNil(endTime);

        return (
            <React.Fragment>
                {hasQuery && `Searching: ${query}`}
                {hasQuery && hasDateRange && " between "}
                {hasDateRange && (
                    <React.Fragment>
                        <DateFormat>{startTime}</DateFormat>
                        {" to "}
                        <DateFormat>{endTime}</DateFormat>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    };

    search = async ({ query, startTime, endTime, maxResults }) => {
        this.setState({ loading: true });

        const data = await Search(query, startTime, endTime, maxResults);

        this.setState({
            loading: false,
            data,
        });
    };

    render() {
        const { data, loading } = this.state;

        const rowSelection = {
            onChange: this.handleRowSelection,
            selectedRowKeys: this.state.selectedRowKeys,
        };

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
                            {this.hasSelections() ? (
                                <Button.Group className={`${styles.toolbar}`}>
                                    <Button
                                        type="danger"
                                        onClick={this.handleDeleteSelections}
                                    >
                                        <Icon type="delete" />
                                        Remove {
                                            this.state.selectedUrls.length
                                        }{" "}
                                        selected
                                    </Button>

                                    <Button
                                        onClick={this.handleCancelSelections}
                                    >
                                        <Icon type="close" />
                                        Cancel
                                    </Button>
                                </Button.Group>
                            ) : (
                                <Input.Group
                                    compact
                                    className={`${styles.filters}`}
                                >
                                    <Input.Search
                                        onChange={this.handleQueryChange}
                                        onSearch={this.handleSearch}
                                        value={this.state.query}
                                        placeholder="Search ..."
                                    />

                                    <DatePicker.RangePicker
                                        format="DD-MM-YYYY"
                                        value={this.state.dateRange}
                                        onChange={this.handleDateSelection}
                                    />

                                    {this.hasFiltersSet() && (
                                        <Button onClick={this.handleClear}>
                                            <Icon type="close" />
                                            Clear
                                        </Button>
                                    )}
                                </Input.Group>
                            )}
                        </Col>
                    </Row>
                </Layout.Header>

                <Layout.Content className={`${styles.wrapper}`}>
                    <div className={`${styles.content}`}>
                        <HistoryTable
                            data={data}
                            getTitle={this.getTitle}
                            loading={loading}
                            rowSelection={rowSelection}
                        />
                    </div>
                </Layout.Content>
            </Layout>
        );
    }
}
