import React from "react";
import { connect } from "react-redux";
import { css } from "glamor";

import { Table } from "antd";

import { getVisibleHistory } from "../reducer";
import { loadBookmarks, setSelections, loadHistory } from "../action";

import BookmarkIcon from "./BookmarkIcon";
import Visits from "./Visits";

import Favicon from "../component/Favicon";
import DateFormat from "../component/DateFormat";
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
};

const columns = [
    {
        title: "Last Visit Time",
        dataIndex: "lastVisitTime",
        key: "lastVisitTime",
        width: 90,
        render: lastVisitTime => (
            <DateFormat format="HH:mm">{lastVisitTime}</DateFormat>
        ),
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
];

class History extends React.Component {
    componentDidMount() {
        this.props.loadHistory();
        this.props.loadBookmarks();
    }

    renderVisits = record => <Visits url={record.url} />;

    handleRowSelection = selectedRowKeys => {
        this.props.setSelections(selectedRowKeys);
    };

    render() {
        const getRowKey = record => record.id;

        const rowSelection = {
            onChange: this.handleRowSelection,
            selectedRowKeys: this.props.selectedIDs,
        };

        return (
            <Table
                className={`${styles.table}`}
                columns={columns}
                dataSource={this.props.history}
                expandedRowRender={this.renderVisits}
                footer={() => {}}
                loading={this.props.isLoading}
                rowKey={getRowKey}
                rowSelection={rowSelection}
                showHeader={false}
                size="small"
                pagination={{
                    pageSize: 50,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total}`,
                }}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        history: getVisibleHistory(state),
        selectedIDs: state.history.selectedIDs,
        isLoading: state.history.isLoading,
    };
};

export default connect(mapStateToProps, {
    loadBookmarks,
    setSelections,
    loadHistory,
})(History);
