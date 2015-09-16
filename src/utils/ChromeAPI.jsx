export function searchHistory(q = "", d = false, e = false, m = 0) {
    let params = {
        text: q,
        maxResults: m
    };
    if (d) {
        params["startTime"] = d;
    }
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