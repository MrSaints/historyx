/* global chrome */

export const SearchHistory = query => {
    return new Promise(resolve => {
        chrome.history.search(query, h => {
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
