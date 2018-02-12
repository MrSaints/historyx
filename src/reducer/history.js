import * as R from "ramda";

import {
    HISTORY_REQUEST,
    HISTORY_SUCCESS,
    HISTORY_FAILURE,
} from "../constants";

const defaultState = {
    isLoading: false,
    byID: {},
    visibleIDs: [],
};

const history = (state = defaultState, action) => {
    switch (action.type) {
    case HISTORY_REQUEST:
        return {
            ...state,
            isLoading: true,
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
    default:
        return state;
    }
};

export default history;

export const getVisibleHistory = state => {
    return R.map(R.prop(R.__, state.history.byID), state.history.visibleIDs);
};
