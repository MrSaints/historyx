import * as R from "ramda";

import {
    BOOKMARKS_REQUEST,
    BOOKMARKS_SUCCESS,
    BOOKMARKS_FAILURE,
} from "../constants";

const defaultState = {
    isLoading: false,
    byURL: {},
};

const flattenBookmarks = R.reduce((acc, node) => {
    const children = R.prop("children", node);
    const isFolder = R.isNil(R.prop("url", node));
    node = isFolder ? [] : [node];
    if (R.isNil(children)) {
        return [...acc, ...node];
    }
    return [...acc, ...node, ...flattenBookmarks(children)];
}, []);
const indexByURL = R.indexBy(R.prop("url"));
const getAllBookmarksByURL = R.pipe(flattenBookmarks, indexByURL);

const bookmarks = (state = defaultState, action) => {
    switch (action.type) {
    case BOOKMARKS_REQUEST:
        return {
            ...state,
            isLoading: true,
        };
    case BOOKMARKS_SUCCESS: {
        return {
            ...state,
            byURL: {
                ...state.byURL,
                ...getAllBookmarksByURL(action.bookmarks),
            },
            isLoading: false,
        };
    }
    case BOOKMARKS_FAILURE:
        return {
            ...state,
            isLoading: false,
        };
    default:
        return state;
    }
};

export default bookmarks;

export const isBookmarked = (state, url) => {
    return Boolean(R.prop(url, state.bookmarks.byURL));
};
