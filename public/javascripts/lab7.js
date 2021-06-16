const token = document.getElementById("body").dataset.token;

const getTelegramUpdates = () => {

    const messageElement = $("#lastMessage");

    telegramGetUpdatesRequest({ access_token: token }).done(data => {
        const result = data["result"];

        if (result.length === 0) {
            messageElement.text("В бота давно никто не писал").show();
            messageElement.style.display = "block";
        } else {
            const lastMessageText = result[result.length - 1].message.text;
            messageElement.text(lastMessageText).show();
            messageElement.style.display = "block";
        }
    });
}

$('#getLastMessage').click(getTelegramUpdates);
