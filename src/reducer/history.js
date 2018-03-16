import * as R from "ramda";

import {
    HISTORY_REQUEST,
    HISTORY_SUCCESS,
    HISTORY_FAILURE,
    HISTORY_SELECTIONS,
} from "../constants";

const defaultState = {
    isLoading: false,
    byID: {},
    visibleIDs: [],
    selectedIDs: [],
    query: {
        text: "",
        startTime: 0,
        endTime: null,
        maxResults: 0,
    },
};

const history = (state = defaultState, action) => {
    switch (action.type) {
    case HISTORY_REQUEST:
        return {
            ...state,
            isLoading: true,
            query: action.query,
        };
    case HISTORY_SUCCESS:
        return {
            ...state,
            byID: {
                ...state.byID,
                ...R.indexBy(R.prop("id"), action.history),
            },
            visibleIDs: R.pluck("id", action.history),
            isLoading: false,
        };
    case HISTORY_FAILURE:
        return {
            ...state,
            isLoading: false,
        };
    case HISTORY_SELECTIONS:
        return {
            ...state,
            selectedIDs: action.selections,
        };
    default:
        return state;
    }
};

export default history;

export const getVisibleHistory = state => {
    return R.map(R.prop(R.__, state.history.byID), state.history.visibleIDs);
};

export const totalSelections = state => {
    return R.length(state.history.selectedIDs);
};
