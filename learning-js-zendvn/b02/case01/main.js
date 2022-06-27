var courseList = ["Php", "Javascript", "Html", "Css", "Python"];
var eleText = document.querySelector(".text");

function loadingText() {
  var random = Math.random() * courseList.length;
  var index = Math.trunc(random);
  eleText.textContent = courseList[index];
}

setTimeout(loadingText(), 100);
