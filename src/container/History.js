import React from "react";
import PropTypes from "prop-types";
import * as R from "ramda";
import { connect } from "react-redux";
import { css } from "glamor";

import isSameDay from "date-fns/is_same_day";
import isToday from "date-fns/is_today";
import parse from "date-fns/parse";

import { Dropdown, Button, Menu, Table } from "antd";

import { getVisibleHistory } from "../reducer";
import { loadBookmarks, setSelections, loadHistory } from "../action";

import BookmarkIcon from "./BookmarkIcon";
import Visits from "./Visits";

import DateFormat from "../component/DateFormat";
import Favicon from "../component/Favicon";
import Hostname from "../component/Hostname";
import TitleAndDomain from "../component/TitleAndDomain";

const styles = {
    titleDomain: css({
        position: "relative",
    }),
    table: css({
        " .ant-table": {
            background: "#FFF",
            tableLayout: "fixed",
        },
    }),
    verboseLastVisitTime: css({
        fontSize: ".75em",
        whiteSpace: "nowrap",
    }),
};

class History extends React.Component {
    lastSelectedIndex = null;

    componentDidMount() {
        this.props.loadHistory("", 0, null, 0, false);
        this.props.loadBookmarks();
    }

    static renderVisits = record => <Visits url={record.url} />;

    renderTitle = currentPageData => {
        if (!R.length(currentPageData)) {
            return null;
        }

        const isEmptyNil = R.either(R.isEmpty, R.isNil);

        const { text, startTime, endTime } = this.props.query;
        const search = text;
        const hasDateRange = !isEmptyNil(startTime) && !isEmptyNil(endTime);

        const lastLastVisitTime = R.prop("lastVisitTime")(
            R.last(currentPageData)
        );
        const firstLastVisitTime = R.prop("lastVisitTime")(
            R.head(currentPageData)
        );
        const isLastVisitsSame = isSameDay(
            parse(lastLastVisitTime),
            parse(firstLastVisitTime)
        );

        const withDateFormat = dt => (
            <DateFormat format="Do MMMM">{dt}</DateFormat>
        );

        return (
            <React.Fragment>
                {search && (
                    <React.Fragment>
                        <strong>Searching:</strong> <em>{search}</em>
                    </React.Fragment>
                )}
                {search && hasDateRange && " between "}
                {hasDateRange && (
                    <React.Fragment>
                        <DateFormat>{startTime}</DateFormat>
                        {" to "}
                        <DateFormat>{endTime}</DateFormat>
                    </React.Fragment>
                )}
                {(search || hasDateRange) && " | "}
                {withDateFormat(lastLastVisitTime)}
                {!isLastVisitsSame && (
                    <React.Fragment>
                        {" "}
                        to {withDateFormat(firstLastVisitTime)}
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    };

    handleRowSelection = (record, selected, selectedRows, nativeEvent) => {
        const selectedIndex = R.findIndex(
            R.propEq("id", record.id),
            this.props.history
        );
        let selectedIDs = R.pluck("id")(selectedRows);

        if (!R.isNil(this.lastSelectedIndex) && nativeEvent.shiftKey) {
            // Create a list of affected rows by using the last selected index,
            // and the currently selected index to see if we need to affect items
            // "before" the last selected index or "after" the last selected index.
            const affectedRows = this.props.history.filter((item, i) => {
                return this.lastSelectedIndex < selectedIndex
                    ? i <= selectedIndex && i >= this.lastSelectedIndex
                    : i >= selectedIndex && i <= this.lastSelectedIndex;
            });
            const affectedIDs = R.pluck("id")(affectedRows);

            if (selected) {
                // Select by creating a new array of selected IDs,
                // and affected IDs.
                selectedIDs = R.concat(selectedIDs, affectedIDs);
            } else {
                // De-select by creating a new array of IDs that are not in
                // the list of affected IDs or the last selected.
                selectedIDs = selectedIDs.filter(id => {
                    return affectedIDs.indexOf(id) === -1;
                });
            }
        }

        this.lastSelectedIndex = selectedIndex;

        this.props.setSelections(R.uniq(selectedIDs));
    };

    handleMore = url => {
        return e => {
            e.preventDefault();
            this.props.loadHistory(Hostname({ url }), 0, null, 0);
        };
    };

    columns = [
        {
            title: "Last Visit Time",
            dataIndex: "lastVisitTime",
            key: "lastVisitTime",
            width: 90,
            render: lastVisitTime => {
                if (!isToday(parse(lastVisitTime))) {
                    return (
                        <DateFormat
                            {...styles.verboseLastVisitTime}
                            format="HH:mm DD-MM-YYYY"
                        >
                            {lastVisitTime}
                        </DateFormat>
                    );
                }

                return <DateFormat format="HH:mm">{lastVisitTime}</DateFormat>;
            },
        },
        {
            title: "Favicon",
            dataIndex: "url",
            key: "favicon",
            width: 30,
            render: url => <Favicon>{url}</Favicon>,
        },
        {
            title: "Bookmarked",
            dataIndex: "url",
            key: "isBookmarked",
            width: 30,
            render: url => <BookmarkIcon url={url} />,
        },
        {
            title: "Title / Domain",
            key: "titleDomain",
            className: `${styles.titleDomain}`,
            render: (_, record) => (
                <TitleAndDomain
                    title={record.title}
                    domain={record.url}
                    visitCount={record.visitCount}
                />
            ),
        },
        {
            title: "Utilities",
            key: "utilities",
            width: 30,
            render: (_, record) => (
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item>
                                <a onClick={this.handleMore(record.url)}>
                                    More from this site
                                </a>
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <Button
                        icon="ellipsis"
                        shape="circle"
                        size="small"
                        type="ghost"
                    />
                </Dropdown>
            ),
        },
    ];

    render() {
        const getRowKey = record => record.id;

        const rowSelection = {
            onSelect: this.handleRowSelection,
            selectedRowKeys: this.props.selectedIDs,
        };

        return (
            <Table
                className={`${styles.table}`}
                columns={this.columns}
                dataSource={this.props.history}
                expandedRowRender={History.renderVisits}
                footer={this.renderTitle}
                loading={this.props.isLoading}
                rowKey={getRowKey}
                rowSelection={rowSelection}
                showHeader={false}
                size="small"
                title={this.renderTitle}
                pagination={{
                    pageSize: 50,
                    position: "both",
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total}`,
                }}
            />
        );
    }
}

History.propTypes = {
    history: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            lastVisitTime: PropTypes.number,
            title: PropTypes.string,
            typedCount: PropTypes.number,
            url: PropTypes.string,
            visitCount: PropTypes.number,
        })
    ),
    isLoading: PropTypes.bool,
    query: PropTypes.object,
    selectedIDs: PropTypes.arrayOf(PropTypes.string),
    loadBookmarks: PropTypes.func.isRequired,
    setSelections: PropTypes.func.isRequired,
    loadHistory: PropTypes.func.isRequired,
};

History.defaultProps = {
    history: [],
    isLoading: true,
    query: {},
    selectedIDs: [],
};

const mapStateToProps = state => {
    return {
        history: getVisibleHistory(state),
        isLoading: state.history.isLoading,
        query: state.history.query,
        selectedIDs: state.history.selectedIDs,
    };
};

export default connect(mapStateToProps, {
    loadBookmarks,
    setSelections,
    loadHistory,
})(History);
