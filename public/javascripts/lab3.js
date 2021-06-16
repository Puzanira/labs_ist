// const CLIENT_ID = 7839981;
// const USER_ID = 167281445;
// oauth.vk.com/authorize?client_id=________&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token&v=5.130&state=123456
// const API_TOKEN = "_____________";

const token = document.getElementById("body").dataset.token;
const user = document.getElementById("body").dataset.user;

const getFriends = () => {
    const parameters = {
        user_id: user,
        order: 'name',
        count: 10,
        fields: 'domain,sex,bdate,city,country,timezone,photo_50',
        access_token: token,
    };

    vkGetFriendsRequest(parameters).done(data => {
        const friends = data.response.items;

        const friendsTable = document.getElementById("friends");
        friends.forEach((friend, index) => {
            const row = friendsTable.insertRow();
            const number = row.insertCell(0);
            const name = row.insertCell(1);
            const surname = row.insertCell(2);

            number.innerHTML = index;
            name.innerHTML = friend.first_name;
            surname.innerText = friend.last_name;
        });

        friendsTable.style.display = "table";
    });
}

$('#vkGetFriends').click(getFriends);
