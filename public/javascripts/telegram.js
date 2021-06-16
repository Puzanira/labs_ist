const api = "https://api.telegram.org";


const telegramRequest = (method, parameters, request) => {
    const { access_token, ...otherParameters } = parameters;
    const url = `${api}/bot${access_token}/${method}`;
    return request(url, { ...otherParameters });
}

const telegramPostRequest = (method, parameters) => {
    return telegramRequest(method, parameters, post);
}

const telegramGetRequest = (method, parameters) => {
    return telegramRequest(method, parameters, get);
}

const telegramGetUpdatesRequest = parameters =>
    telegramGetRequest('getUpdates', parameters);


