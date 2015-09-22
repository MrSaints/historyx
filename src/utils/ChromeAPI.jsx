export function searchHistory(q = "", d = 0, e = false, m = 0) {
    let params = {
        text: q,
        maxResults: m,
        startTime: d
    };
    if (e) {
        params["endTime"] = e;
    }
    return new Promise((resolve, reject) => {
        chrome.history.search(params, (h) => {
            //console.table(h);
            resolve(h);
        });
    });
};

export function getVisits(u) {
    return new Promise((resolve, reject) => {
        chrome.history.getVisits({url: u}, (v) => {
            //console.table(v);
            resolve(v);
        });
    });
};

export function deleteUrl(u) {
    return new Promise((resolve, reject) => {
        chrome.history.deleteUrl({url: u}, () => {
            resolve();
        });
    });
};