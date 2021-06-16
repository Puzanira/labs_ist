const buildQuery = parameters => {
    return Object.entries(parameters)
        .map(([key, value]) => `${key}=${window.encodeURIComponent(value)}`).join('&');
}

const get = (url, parameters) => {
    const stringParameters = parameters ? buildQuery(parameters) : null;
    const request = `${url}${stringParameters && '?' + stringParameters}`;

    return $.getJSON({
        url: request,
        dataType: "JSON",
    });
}

const getCallback = (callback, url, parameters) => {
    const stringParameters = parameters ? buildQuery(parameters) : null;
    const request = `${url}${stringParameters && '?' + stringParameters}`;

    return $.getJSON({
        url: request,
        dataType: "JSON",
        success: callback,
    });
}

const post = (url, body) => $.post(url, body);
