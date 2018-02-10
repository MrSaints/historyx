/* global chrome */

export const Search = (
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

export const DeleteURL = url => {
    return new Promise(resolve => {
        chrome.history.deleteUrl({ url }, () => {
            resolve();
        });
    });
};
