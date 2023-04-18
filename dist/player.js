"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const login = document.querySelector(".start-button");
    login.addEventListener("click", (e) => {
        e.preventDefault();
        const playerName = document.querySelector("#player-name");
        const messageError = document.querySelector(".message-err");
        if (playerName.value === "") {
            messageError.textContent = "Vui lòng nhập tên người chơi!";
            return;
        }
        else if (playerName.value.length < 3) {
            messageError.textContent = "Tên người chơi phải 3 ký tự!";
            return;
        }
        else {
            messageError.textContent = "";
            localStorage.setItem("player", JSON.stringify(playerName.value));
            location.href = "game.html";
        }
    });
});
