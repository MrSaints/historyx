import React from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { css } from "glamor";

import { Button, DatePicker, Icon, Input } from "antd";

import { loadHistory } from "../action";

const styles = {
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

export default connect(null, { loadHistory })(Toolbar);
