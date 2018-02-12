import * as R from "ramda";

import {
    HISTORY_REQUEST,
    HISTORY_SUCCESS,
    VISITS_REQUEST,
    VISITS_SUCCESS,
    BOOKMARKS_REQUEST,
    BOOKMARKS_SUCCESS,
} from "../constants";

import { getVisitsByURL } from "../reducer";
import { SearchHistory, GetVisits, GetBookmarks } from "../API";

export const loadHistory = (
    query = "",
    startTime = 0,
    endTime = null,
    maxResults = 0
) => {
    return async dispatch => {
        dispatch({ type: HISTORY_REQUEST });

        const history = await SearchHistory(
            query,
            startTime,
            endTime,
            maxResults
        );

        dispatch({
            type: HISTORY_SUCCESS,
            history,
        });
    };
};

export const loadVisits = url => {
    return async (dispatch, getState) => {
        // Do not fetch visits if it has already been fetched
        if (!R.isEmpty(getVisitsByURL(getState(), url))) {
            return;
        }

        dispatch({ type: VISITS_REQUEST });

        const visits = await GetVisits(url);

        dispatch({
            type: VISITS_SUCCESS,
            url,
            visits,
        });
    };
};

export const loadBookmarks = () => {
    return async dispatch => {
        dispatch({ type: BOOKMARKS_REQUEST });

        const bookmarks = await GetBookmarks();

        dispatch({
            type: BOOKMARKS_SUCCESS,
            bookmarks,
        });
    };
};
