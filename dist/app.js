"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const playerNameJSON = localStorage.getItem("player");
    const playerName = playerNameJSON
        ? JSON.parse(playerNameJSON)
        : null;
    class CardSelector {
        constructor() {
            this.first = { id: -1, name: "first" };
            this.second = { id: -1, name: "second" };
            this.select = (cardId, name) => {
                if (this.first.id === -1) {
                    this.first = { id: cardId, name: name };
                }
                else if (this.first.id === cardId || this.second.id === cardId) {
                    console.error("duplicate selection");
                }
                else if (this.second.id === -1) {
                    this.second = { id: cardId, name: name };
                }
            };
            this.isFull = () => {
                return this.first.id !== -1 && this.second.id !== -1;
            };
            this.contains = (x) => {
                return this.first.id === x || this.second.id === x;
            };
            this.clear = () => {
                this.first = { id: -1, name: "first" };
                this.second = { id: -1, name: "second" };
            };
        }
    }
    const createBoard = () => {
        const grid = document.querySelector(".grid");
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement("img");
            card.setAttribute("data-id", i.toString());
            card.setAttribute("draggable", "false");
            grid === null || grid === void 0 ? void 0 : grid.appendChild(card);
        }
        startGame();
    };
    const backLogin = () => {
        if (playerName) {
            localStorage.clear();
            location.href = "index.html";
        }
    };
    const startGame = () => {
        if (playerName) {
            const playerLabel = document.querySelector("#player-name");
            playerLabel.textContent = `Xin chào: ${playerName}`;
        }
        else {
            alert("Vui lòng nhập tên người chơi!");
            location.href = "index.html";
        }
        cardArray.sort(() => 0.5 - Math.random());
        cardsWon = 0;
        updateScore();
        cardsChosen.clear();
        const images = document.querySelectorAll("img");
        images.forEach((node) => {
            if (!(node instanceof HTMLImageElement)) {
                throw new Error("Expected grid child nodes to be of type HTMLImageElement");
            }
            node.setAttribute("src", "../image/question.gif");
            node.addEventListener("click", flipCard);
        });
    };
    const updateScore = () => {
        if (resultDisplay) {
            resultDisplay.textContent = `${cardsWon} / ${cardArray.length / 2}`;
        }
    };
    const checkForMatch = () => {
        let cards = document.querySelectorAll("img");
        const { first, second } = cardsChosen;
        if (first.name === second.name) {
            cards[first.id].removeEventListener("click", flipCard);
            cards[second.id].removeEventListener("click", flipCard);
            cardsWon++;
            updateScore();
        }
        else {
            cards[first.id].setAttribute("src", "../image/question.gif");
            cards[second.id].setAttribute("src", "../image/question.gif");
        }
        cardsChosen.clear();
        if (cardsWon === cardArray.length / 2) {
            alert("Bạn đã dành chiến thắng!");
        }
    };
    const flipCard = (event) => {
        let card = event.target;
        let cardId = parseInt(card.getAttribute("data-id") || "-2");
        if (!cardsChosen.isFull() && !cardsChosen.contains(cardId)) {
            cardsChosen.select(cardId, cardArray[cardId].name);
            card.setAttribute("src", cardArray[cardId].img);
            if (cardsChosen.isFull()) {
                setTimeout(checkForMatch, 500);
            }
        }
    };
    const imageNames = ["burger", "fire", "flash", "plant", "ufo", "youtube"];
    let cardArray = imageNames.map((name) => ({
        name: name,
        img: `../image/${name}.png`,
    }));
    cardArray = [...cardArray, ...cardArray];
    const resultDisplay = document.querySelector("#current-score");
    const restartButton = document.querySelector("#reset-button");
    const cancel = document.querySelector(".cancel");
    restartButton === null || restartButton === void 0 ? void 0 : restartButton.addEventListener("click", startGame);
    cancel === null || cancel === void 0 ? void 0 : cancel.addEventListener("click", backLogin);
    const cardsChosen = new CardSelector();
    let cardsWon = 0;
    createBoard();
});
