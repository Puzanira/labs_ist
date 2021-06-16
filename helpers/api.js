const qs = require('qs');


const defaultHeaders = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
}

const buildQueryString = queryObject => {
    return qs.stringify(queryObject);
}

const post = (url, data = {}) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        ...defaultHeaders,
    });
}

const get = (url, queryObject) => {
    const requestUrl = queryObject ? `${url}?${buildQueryString(queryObject)}` : url;
    return fetch(requestUrl, {
        ...defaultHeaders,
    });
}

module.exports = {
    post,
    get,
    buildQueryString,
};
