const LENGTH = 20;
const COLUMN = 4;
const TURN = 5;
let index = 0;
let alert = "";
let start = 0;
let end = 0;
let x = random(LENGTH);
const STATUS_PLAYING = "playing";
const STATUS_ENDED = "ended";
const result = document.querySelector(".result");
const numberList = document.querySelector(".table");
const textArea = document.querySelector(".textArea");
const reset = document.querySelector(".reset");
const recommend = document.querySelector(".recommend");
const play = document.querySelector(".start");
const level = document.querySelector(".level");
// EVENT
document.addEventListener("click", function (e) {
  const turnList = document.querySelectorAll(".turn");

  let ele = e.target;
  if (ele.classList.contains("number") && ele.classList.contains("playing")) {
    let n = parseInt(ele.textContent);
    index++;
    if (index === TURN) {
      getClassStatus("remove", "auto");
    }
    if (x === n) {
      alert += ` <p class="true">Bạn đã thắng</p>`;
      getClassStatus("remove", "auto");
      turnList[index - 1].classList.add("true");
    } else if (x < n) {
      alert += renderAlert(n, ">");
      turnList[index - 1].classList.add("false");
      start = ele.textContent > start ? ele.textContent : start;
    } else {
      alert += renderAlert(n, "<");
      turnList[index - 1].classList.add("false");
      end = ele.textContent > end ? ele.textContent : end;
    }
    textArea.innerHTML = alert;
  }
});

play.addEventListener("click", function startClick() {
  getClassStatus("add", "pointer");
});

reset.addEventListener("click", function resetClick() {
  x = random(LENGTH);
  index = 0;
  renderNumber(LENGTH);
  getClassStatus("add", "pointer");
  alert = "";
  textArea.innerHTML = alert;
});
recommend.addEventListener("click", function resetClick() {
  const number = document.querySelectorAll(".number");
  for (let i = 0; i < LENGTH; i++) {
    const n = number[i].textContent;
    if (n <= start) {
      console.log(start);
      number[i].classList.add("start");
    }
    if (n >= end) {
      console.log(end);
      number[i].classList.add("end");
    }
  }
});

// FUNCTION
function random(n) {
  return Math.trunc(Math.random() * n) + 1;
}
function renderAlert(n, str) {
  return `<p class="false">Số ${n} ${str} só bí mật
  </p>`;
}
function getClassStatus(action, cursorStyle) {
  const number = document.querySelectorAll(".number");
  for (let i = 0; i < number.length; i++) {
    if (action === "remove") {
      number[i].classList.remove("playing");
    }
    if (action === "add") {
      number[i].classList.add("playing");
    }
    number[i].style.cursor = cursorStyle;
  }
}
function renderNumber(length) {
  let str = "";
  for (let i = 1; i <= length; i++) {
    str += `<li class="number">${i}</li>`;
  }
  numberList.innerHTML = str;

  document.querySelectorAll(".table li").forEach((box) => {
    box.style.width = 100 / COLUMN + "%";
    const boxSize = document.querySelector(".table li").offsetWidth;
    document.querySelectorAll(".table li").forEach((box) => {
      box.style.height = boxSize + "px";
    });
  });

  window.addEventListener("resize", function () {
    const boxSize = document.querySelector(".table li").offsetWidth;
    document.querySelectorAll(".table li").forEach((box) => {
      box.style.height = boxSize + "px";
    });
  });

  let strTurn = "";
  for (let i = 0; i < TURN; i++) {
    strTurn += `<li class="turn"></li>`;
  }
  level.innerHTML = strTurn;
  textArea.innerHTML = "";
}
renderNumber(LENGTH);
