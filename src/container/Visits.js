import React from "react";
import * as R from "ramda";
import { connect } from "react-redux";

import { Table } from "antd";

import { getVisitsByURL } from "../reducer";
import { loadVisits } from "../action";

import DateFormat from "../component/DateFormat";

class Visits extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: "Visit Time",
                dataIndex: "visitTime",
                key: "visitTime",
                render: visitTime => (
                    <DateFormat
                        format="DD MMMM YY [a][t] HH:mm:ss"
                        humanizeRecent={true}
                    >
                        {visitTime}
                    </DateFormat>
                ),
            },
        ];
    }

    componentDidMount() {
        this.props.loadVisits(this.props.url);
    }

    render() {
        const getRowKey = record => record.visitId;

        return (
            <Table
                columns={this.columns}
                dataSource={R.reverse(this.props.visits)}
                loading={this.props.isLoading}
                rowKey={getRowKey}
                showHeader={false}
                size="small"
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        visits: getVisitsByURL(state, ownProps.url),
        isLoading: state.visits.isLoading,
    };
};

export default connect(mapStateToProps, { loadVisits })(Visits);
