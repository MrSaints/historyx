import React from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { css } from "glamor";

import { Button, DatePicker, Icon, Input, Modal } from "antd";

import { loadHistory, setSelections, deleteSelections } from "../action";
import { totalSelections } from "../reducer";

const styles = {
    selections: css({
        display: "block !important",
        textAlign: "center",
    }),
    filters: css({
        alignItems: "center",
        display: "flex !important",
        height: "64px",
    }),
};

class Toolbar extends React.Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            search: "",
            dateRange: [],
        };
        this.state = this.defaultState;
    }

    handleSearchChange = e => {
        this.setState({ search: e.target.value });
    };

    handleSearch = () => {
        this.search();
    };

    handleDateSelection = dateRange => {
        this.setState({ dateRange }, () => {
            this.search();
        });
    };

    handleClear = () => {
        this.setState(this.defaultState, () => {
            this.search();
        });
    };

    handleDeleteSelections = () => {
        Modal.confirm({
            title: "Remove selected items",
            content:
                "Are you sure that you want to delete these pages from your history?",
            okText: "Remove",
            cancelText: "Cancel",
            onOk: () => {
                this.props.deleteSelections();
            },
        });
    };

    handleCancelSelections = () => {
        this.props.setSelections([]);
    };

    hasFilters = () => {
        return !R.equals(this.state, this.defaultState);
    };

    search = () => {
        const { search, dateRange } = this.state;
        const [startDate, endDate] = dateRange;

        this.props.loadHistory(
            search || "",
            startDate ? startDate.startOf("day").valueOf() : 0,
            endDate ? endDate.endOf("day").valueOf() : null
        );
    };

    render() {
        if (this.props.totalSelections) {
            return (
                <Button.Group className={`${styles.selections}`}>
                    <Button
                        type="danger"
                        onClick={this.handleDeleteSelections}
                    >
                        <Icon type="delete" />
                        {`Remove ${this.props.totalSelections} selected`}
                    </Button>

                    <Button
                        onClick={this.handleCancelSelections}
                    >
                        <Icon type="close" />
                        Cancel
                    </Button>
                </Button.Group>
            );
        }

        return (
            <Input.Group compact className={`${styles.filters}`}>
                <Input.Search
                    onChange={this.handleSearchChange}
                    onSearch={this.handleSearch}
                    placeholder="Search ..."
                    value={this.state.search}
                />

                <DatePicker.RangePicker
                    format="DD-MM-YYYY"
                    onChange={this.handleDateSelection}
                    value={this.state.dateRange}
                />

                {this.hasFilters() && (
                    <Button onClick={this.handleClear}>
                        <Icon type="close" />
                        Clear
                    </Button>
                )}
            </Input.Group>
        );
    }
}

const mapStateToProps = state => {
    return {
        totalSelections: totalSelections(state),
    };
};

export default connect(mapStateToProps, { loadHistory, setSelections, deleteSelections })(Toolbar);
