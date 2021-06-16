const version = "5.131";
const api = "https://api.vk.com/method";


const vkRequest = (method, parameters, request) => {
    const url = `${api}/${method}`;
    return request(url, { ...parameters, v: version });
}


const vkPostRequest = (method, parameters) => {
    return vkRequest(method, parameters, post);
}

const vkGetRequest = (method, parameters) => {
    return vkRequest(method, parameters, get);
}

const vkGetRequestCallback = (method, parameters, callback) => {
    const getRequest = getCallback.bind(this, callback);
    return vkRequest(method, parameters, getRequest)
}

const vkGetFriendsRequest = parameters =>
    vkGetRequest('friends.get', parameters);

const vkGetFriendsRequestCallback = (parameters, callback) =>
    vkGetRequestCallback('friends.get', parameters, callback);

const vkGetOnlineFriendsRequest = parameters =>
    vkGetRequest('friends.getOnline', parameters);

const vkGetOnlineFriendsRequestCallback = (parameters, callback) =>
    vkGetRequestCallback('friends.getOnline', parameters, callback);

const vkGetWallRequest = parameters =>
    vkGetRequest('wall.get', parameters);

const vkIsLikedRequest = parameters =>
    vkGetRequest('likes.isLiked', parameters);

const vkAddLikeRequest = parameters =>
    vkPostRequest('likes.add', parameters);


