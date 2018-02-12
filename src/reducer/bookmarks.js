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

const bookmarks = (state = defaultState, action) => {
    switch (action.type) {
    case BOOKMARKS_REQUEST:
        return {
            ...state,
            isLoading: true,
        };
    case BOOKMARKS_SUCCESS: {
        const flattenBookmarks = R.pipe(
            R.map(node => {
                const isFolder = R.isNil(R.prop("url", node));
                const nodeIfBookmark = isFolder ? null : node;
                const children = R.prop("children", node);
                return R.isNil(children)
                    ? nodeIfBookmark
                    : [nodeIfBookmark, ...flattenBookmarks(children)];
            }),
            R.flatten
        );
        const indexByURL = R.indexBy(R.prop("url"));
        const excludeNils = R.reject(R.isNil);
        const getAllBookmarksByURL = R.pipe(
            flattenBookmarks,
            excludeNils,
            indexByURL
        );

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
