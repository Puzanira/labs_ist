const token = document.getElementById("body").dataset.token;
const user = document.getElementById("body").dataset.user;

const likePost = () => {
    const ownerId = '416339774'; // Романова Наталья Андреевна
    const parameters = {
        owner_id: ownerId,
        count: 1,
        filter: 'owner',
        access_token: token,
    };

    let postId = null;

    const addLike = data => {
        const messageElement = document.getElementById("message");

        if (data.response.liked === 1) {
            messageElement.classList.add("alert-primary");
            messageElement.innerText = "Вы уже лайкнули этот пост";
        } else {
            vkAddLikeRequest({
                owner_id: ownerId,
                type: 'post',
                item_id: postId,
                access_token: token,
            }).done(data => {
                if (data.hasOwnProperty("likes")) {
                    messageElement.classList.add("alert-success");
                    messageElement.innerText = "Лайк успешно поставлен";
                } else if (data.hasOwnProperty("error")) {
                    messageElement.classList.add("alert-danger");
                    messageElement.innerText = "Ошибка в лайке. Проверьте права доступа";
                }
            });
        }
    }

    vkGetWallRequest(parameters)
        .then(data => {
            postId = data.response.items[0].id;

            return vkIsLikedRequest({
                owner_id: ownerId,
                type: 'post',
                user_id: user,
                item_id: postId,
                access_token: token,
            });
        }).then(addLike);
}

$('#vkLikePost').click(likePost);
