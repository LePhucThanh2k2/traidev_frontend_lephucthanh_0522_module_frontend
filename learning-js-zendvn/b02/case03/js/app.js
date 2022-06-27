var eleLineHeight = document.querySelector(".lineHeight");
var eleTextAlign = document.querySelector(".textAlign");
var eleContent = document.getElementById("content");
var fontSize = Number.parseInt(
  window.getComputedStyle(eleContent, null).getPropertyValue("font-size")
  // window.getComputedStyle(eleContent, null).fontSize
);

// create data to save localStorage
var data = {};
// set font size default for content
eleContent.style.fontSize = fontSize + "px";

// Set Data To localStorage
window.onload = function setDataFromLocalStorage() {
  var dataLocal = JSON.parse(localStorage.getItem("dataContent"));
  eleContent.style.backgroundColor = dataLocal.backgroundColor;
  eleContent.style.fontSize = dataLocal.fontSize + "px";
  eleContent.style.lineHeight = dataLocal.lineHeight;
  eleContent.style.textAlign = dataLocal.textAlign;
  eleLineHeight.value = dataLocal.lineHeight;
  eleTextAlign.value = dataLocal.textAlign;
};

// Add Event Click
document.addEventListener("click", function (e) {
  let ele = e.target;
  eleContent.style.fontSize = fontSize + "px";

  if (ele.classList.contains("btn-background")) {
    var color = ele.dataset.value;
    eleContent.style.backgroundColor = color;
    data.backgroundColor = color;
  }

  if (ele.classList.contains("decrease")) {
    fontSize -= 2;
    eleContent.style.fontSize = fontSize + "px";
    data.fontSize = fontSize;
  }

  if (ele.classList.contains("increase")) {
    fontSize += 2;
    eleContent.style.fontSize = fontSize + "px";
    data.fontSize = fontSize;
  }
  localStorage.setItem("dataContent", JSON.stringify(data));
});

//Add Event Change
document.addEventListener("change", function (e) {
  let ele = e.target;
  if (ele.classList.contains("lineHeight")) {
    eleContent.style.lineHeight = eleLineHeight.value;
    data.lineHeight = eleLineHeight.value;
  }
  if (ele.classList.contains("textAlign")) {
    eleContent.style.textAlign = eleTextAlign.value;
    data.textAlign = eleTextAlign.value;
  }
  localStorage.setItem("dataContent", JSON.stringify(data));
});
