import React from "react";
import PropTypes from "prop-types";
import * as R from "ramda";
import { connect } from "react-redux";

import { Table, Icon, Tooltip } from "antd";

import { getVisitsByURL } from "../reducer";
import { loadVisits } from "../action";

import DateFormat from "../component/DateFormat";

const transitionToIconType = {
    link: "link",
    typed: "message",
    auto_bookmark: "flag",
    auto_subframe: "layout",
    manual_subframe: "layout",
    generated: "ellipsis",
    auto_toplevel: "poweroff",
    form_submit: "form",
    reload: "reload",
    keyword: "search",
    keyword_generated: "search",
};

const transitionToDescription = {
    link: "Link on a page",
    typed: "Typed via address bar",
    auto_bookmark: "Item from bookmarks or browsing history",
    auto_subframe: "iframe",
    manual_subframe: "iframe via a manual action",
    generated: "Address bar suggestion",
    auto_toplevel: "Command line or default start page",
    form_submit: "Form submission",
    reload: "Page reload",
    keyword: "Search suggestion",
    keyword_generated: "Search suggestion",
};

class Visits extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: "Transition",
                dataIndex: "transition",
                key: "transition",
                width: 30,
                render: transition => {
                    const iconType = R.prop(transition, transitionToIconType);
                    const description = R.prop(
                        transition,
                        transitionToDescription
                    );
                    return (
                        iconType &&
                        description && (
                            <Tooltip title={description}>
                                <Icon type={iconType} />
                            </Tooltip>
                        )
                    );
                },
            },
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

Visits.propTypes = {
    url: PropTypes.string.isRequired,
    visits: PropTypes.arrayOf(
        PropTypes.shape({
            transition: PropTypes.string.isRequired,
            visitTime: PropTypes.number.isRequired,
        })
    ),
    isLoading: PropTypes.bool,
    loadVisits: PropTypes.func.isRequired,
};

Visits.defaultProps = {
    visits: [],
    isLoading: true,
};

const mapStateToProps = (state, ownProps) => {
    return {
        visits: getVisitsByURL(state, ownProps.url),
        isLoading: state.visits.isLoading,
    };
};

export default connect(mapStateToProps, { loadVisits })(Visits);
