import React from "react";
import * as R from "ramda";
import PropTypes from "prop-types";
import { css } from "glamor";

import { Table } from "antd";

import Favicon from "../component/Favicon";
import DateFormat from "../component/DateFormat";
import TitleAndDomain from "../component/TitleAndDomain";

const styles = {
    titleDomain: css({
        position: "relative",
    }),
};

const columns = [
    {
        title: "Last Visit Time",
        dataIndex: "lastVisitTime",
        key: "lastVisitTime",
        width: 100,
        render: text => <DateFormat format="HH:mm">{text}</DateFormat>,
    },
    {
        title: "Favicon",
        dataIndex: "url",
        key: "favicon",
        width: 30,
        render: text => <Favicon>{text}</Favicon>,
    },
    {
        title: "Title / Domain",
        key: "titleDomain",
        className: `${styles.titleDomain}`,
        render: (text, record) => (
            <TitleAndDomain
                title={record.title}
                domain={record.url}
                visitCount={record.visitCount}
            />
        ),
    },
];

class HistoryTable extends React.Component {
    shouldComponentUpdate(nextProps) {
        const hasSameData = R.equals(nextProps.data, this.props.data);
        const hasSameLoading = nextProps.loading === this.props.loading;
        const hasSameRowSelections = R.equals(
            nextProps.rowSelection.selectedRowKeys || [],
            this.props.rowSelection.selectedRowKeys || []
        );

        if (hasSameData && hasSameLoading && hasSameRowSelections) {
            return false;
        }

        return true;
    }

    render() {
        const { data, getTitle, loading, rowSelection } = this.props;

        return (
            <Table
                columns={columns}
                dataSource={data}
                footer={() => {}}
                loading={loading}
                rowKey={record => record.id}
                rowSelection={rowSelection}
                showHeader={false}
                size="small"
                title={getTitle}
                pagination={{
                    pageSize: 50,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total}`,
                }}
            />
        );
    }
}

HistoryTable.propTypes = {
    data: PropTypes.array.isRequired,
    getTitle: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    rowSelection: PropTypes.object.isRequired,
};

HistoryTable.defaultProps = {
    data: [],
    getTitle: () => {},
    loading: true,
    rowSelection: {},
};

export default HistoryTable;
