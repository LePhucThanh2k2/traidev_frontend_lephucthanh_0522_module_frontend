var eleBox = document.getElementById("box");
var eleBtn = document.querySelector(".btn");
eleBtn.addEventListener("click", printText, false);
function printText() {
  eleBox.textContent = "<h1>Lê Phúc Thành</h2>";
}
