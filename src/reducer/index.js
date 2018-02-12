import { combineReducers } from "redux";

import bookmarks, * as fromBookmarks from "./bookmarks";
import history, * as fromHistory from "./history";
import visits, * as fromVisits from "./visits";

export const isBookmarked = fromBookmarks.isBookmarked;
export const getVisibleHistory = fromHistory.getVisibleHistory;
export const getVisitsByURL = fromVisits.getVisitsByURL;

export default combineReducers({
    bookmarks,
    history,
    visits,
});
