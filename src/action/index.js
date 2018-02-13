import * as R from "ramda";

import {
    HISTORY_REQUEST,
    HISTORY_SUCCESS,
    HISTORY_SELECTIONS,
    VISITS_REQUEST,
    VISITS_SUCCESS,
    BOOKMARKS_REQUEST,
    BOOKMARKS_SUCCESS,
} from "../constants";

import { getVisitsByURL } from "../reducer";
import { SearchHistory, GetVisits, DeleteURL, GetBookmarks } from "../API";

export const loadHistory = (
    text = "",
    startTime = 0,
    endTime = null,
    maxResults = 0,
    cache = true
) => {
    const query = {
        text,
        startTime,
        endTime,
        maxResults,
    };

    return async (dispatch, getState) => {
        // Do not search if the query has not changed
        if (cache && R.equals(query, getState().history.query)) {
            return;
        }

        dispatch({ type: HISTORY_REQUEST, query });

        const history = await SearchHistory(query);

        dispatch({
            type: HISTORY_SUCCESS,
            history,
        });
    };
};

export const setSelections = selections => ({
    type: HISTORY_SELECTIONS,
    selections,
});

export const deleteSelections = () => {
    return async (dispatch, getState) => {
        const { history } = getState();
        const excludeNils = R.reject(R.isNil);
        const getURLsFromIDs = R.pipe(
            R.map(R.pipe(id => [id, "url"], R.path(R.__, history.byID))),
            excludeNils
        );
        const getDeletePromises = R.map(DeleteURL);

        await Promise.all(
            getDeletePromises(getURLsFromIDs(history.selectedIDs))
        );

        dispatch(setSelections([]));
        dispatch(loadHistory(...R.values(history.query), false));
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
