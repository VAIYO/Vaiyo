function togleOtherWallet() {
  const otherbtn = document.getElementById("otherwallet");
  if (otherbtn.innerHTML == "keyboard_arrow_right")
    otherbtn.innerHTML = "keyboard_arrow_down";
  else otherbtn.innerHTML = "keyboard_arrow_right";
}
