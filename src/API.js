/* global chrome */

export const SearchHistory = (
    query = "",
    startTime = 0,
    endTime = null,
    maxResults = 0
) => {
    const params = {
        text: query,
        startTime,
        endTime,
        maxResults,
    };

    return new Promise(resolve => {
        chrome.history.search(params, h => {
            //console.table(h);
            resolve(h);
        });
    });
};

export const GetVisits = url => {
    return new Promise(resolve => {
        chrome.history.getVisits({ url }, r => {
            resolve(r);
        });
    });
};

export const DeleteURL = url => {
    return new Promise(resolve => {
        chrome.history.deleteUrl({ url }, () => {
            resolve();
        });
    });
};

export const GetBookmarks = () => {
    return new Promise(resolve => {
        chrome.bookmarks.getTree(b => {
            resolve(b);
        });
    });
};
