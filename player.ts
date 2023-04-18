document.addEventListener("DOMContentLoaded", () => {
  const login: HTMLElement = document.querySelector(
    ".start-button"
  ) as HTMLElement;
  login.addEventListener("click", (e: Event): void => {
    e.preventDefault();
    const playerName: HTMLElement | any = document.querySelector(
      "#player-name"
    ) as HTMLElement;
    const messageError: HTMLElement = document.querySelector(
      ".message-err"
    ) as HTMLElement;
    if (playerName.value === "") {
      messageError.textContent = "Vui lòng nhập tên người chơi!";
      return;
    } else if (playerName.value.length < 3) {
      messageError.textContent = "Tên người chơi phải 3 ký tự!";
      return;
    } else {
      messageError.textContent = "";
      localStorage.setItem("player", JSON.stringify(playerName.value));
      location.href = "game.html";
    }
  });
});
