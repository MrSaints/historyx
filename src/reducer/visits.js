import * as R from "ramda";

import { VISITS_REQUEST, VISITS_SUCCESS, VISITS_FAILURE } from "../constants";

const defaultState = {
    isLoading: false,
    byURL: {},
};

const visits = (state = defaultState, action) => {
    switch (action.type) {
    case VISITS_REQUEST:
        return {
            ...state,
            isLoading: true,
        };
    case VISITS_SUCCESS:
        return {
            ...state,
            byURL: {
                ...state.byURL,
                [action.url]: action.visits,
            },
            isLoading: false,
        };
    case VISITS_FAILURE:
        return {
            ...state,
            isLoading: false,
        };
    default:
        return state;
    }
};

export default visits;

export const getVisitsByURL = (state, url) => {
    return R.propOr([], url, state.visits.byURL);
};
