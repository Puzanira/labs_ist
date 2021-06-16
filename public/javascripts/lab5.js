const token = document.getElementById("body").dataset.token;
const user = document.getElementById("body").dataset.user;

const getMostPopularFriend = () => {
    const onlineParameters = {
        user_id: user,
        access_token: token,
    };

    vkGetOnlineFriendsRequest(onlineParameters).done(data => {
        let mostPopularFriendsCount = 0;
        let mostPopularFriendID = "Нет друзей онлайн";

        const mostPopularFriendSpan = $('#mostPopularFriend');

        const friendsArray = data.response;

        // Справляемся с ограничением на количество запросов
        const chunkSize = 5; // Для маленьких приложений max 5 запросов в секунду
        const friendsSubarray = [];
        for (let i = 0; i < Math.ceil(friendsArray.length/chunkSize); i++) {
            friendsSubarray[i] = friendsArray.slice((i * chunkSize), (i * chunkSize) + chunkSize);
        }

        const getMostPopularFriend = friends =>
            friends.forEach(friend => {
                vkGetFriendsRequest({ user_id: friend, access_token: token }).done(data => {
                    if (data.response && data.response.count && data.response.count > mostPopularFriendsCount) {
                        mostPopularFriendsCount = data.response.count;
                        mostPopularFriendID = friend;

                        mostPopularFriendSpan.text(`${mostPopularFriendID} с количеством друзей ${mostPopularFriendsCount}`).show();
                    }
                });
            });

        const delayFriendRequest = (friendsArray, index) =>
            window.setTimeout(() => getMostPopularFriend(friendsArray), 2000 * index);

        friendsSubarray.forEach((friendChunk, index) => {
            delayFriendRequest(friendChunk, index);
        });
    });
}


const getMostPopularFriendCallback = () => {
    const onlineParameters = {
        user_id: user,
        access_token: token,
    };

    let mostPopularFriendsCount = 0;
    let mostPopularFriendID = "Нет друзей онлайн";
    let currentFriendID = "";

    const mostPopularFriendSpan = $('#mostPopularFriendCallback');

    const checkFriends = data => {
        if (data.response && data.response.count && data.response.count > mostPopularFriendsCount) {
            mostPopularFriendsCount = data.response.count;
            mostPopularFriendID = currentFriendID;

            mostPopularFriendSpan.text(`${mostPopularFriendID} с количеством друзей ${mostPopularFriendsCount}`).show();
        }
    };

    const getMostPopularFriend = friends =>
        friends.forEach(friend => {
            currentFriendID = friend;
            vkGetFriendsRequestCallback({ user_id: friend, access_token: token }, checkFriends);
        });

    const findMostPopularFriend = data => {
        const friendsArray = data.response;

        // Справляемся с ограничением на количество запросов
        const chunkSize = 5; // Для маленьких приложений max 5 запросов в секунду
        const friendsSubarray = [];
        for (let i = 0; i < Math.ceil(friendsArray.length / chunkSize); i++) {
            friendsSubarray[i] = friendsArray.slice((i * chunkSize), (i * chunkSize) + chunkSize);
        }

        const delayFriendRequest = (friendsArray, index) =>
            window.setTimeout(() => getMostPopularFriend(friendsArray), 2000 * index);

        friendsSubarray.forEach((friendChunk, index) => {
            delayFriendRequest(friendChunk, index);
        });
    }

    vkGetOnlineFriendsRequestCallback(onlineParameters, findMostPopularFriend);
};

$('#getMostPopularFriend').click(getMostPopularFriend);
$('#getMostPopularFriendCallback').click(getMostPopularFriendCallback);
