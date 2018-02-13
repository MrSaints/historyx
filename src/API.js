/* global chrome */

export const SearchHistory = query => {
    return new Promise(resolve => {
        chrome.history.search(query, resolve);
    });
};

export const GetVisits = url => {
    return new Promise(resolve => {
        chrome.history.getVisits({ url }, resolve);
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
        chrome.bookmarks.getTree(resolve);
    });
};

export const CreateTab = props => {
    return new Promise(resolve => {
        chrome.tabs.create(props, resolve);
    });
};
