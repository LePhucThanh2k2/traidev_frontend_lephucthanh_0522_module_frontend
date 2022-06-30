var eleLineHeight = document.querySelector(".lineHeight");
var eleTextAlign = document.querySelector(".textAlign");
var eleContent = document.getElementById("content");
var fontSize = Number.parseInt(
  window.getComputedStyle(eleContent, null).getPropertyValue("font-size")
);

// create data to save localStorage

// Set Data To localStorage
// window.onload = function setDataFromLocalStorage() {
//   var dataLocal = JSON.parse(localStorage.getItem("dataContent"));
//   eleContent.style.backgroundColor = dataLocal.backgroundColor;
//   eleContent.style.fontSize = dataLocal.fontSize + "px";
//   eleContent.style.lineHeight = dataLocal.lineHeight;
//   eleContent.style.textAlign = dataLocal.textAlign;
//   eleLineHeight.value = dataLocal.lineHeight;
//   eleTextAlign.value = dataLocal.textAlign;
// };

let config = JSON.parse(localStorage.getItem("dataContent")) || {};
for (const property in config) {
  eleContent.style[property] = config[property];
}

// Add Event Click
document.addEventListener("click", function (e) {
  let ele = e.target;

  if (ele.classList.contains("btn-background")) {
    var color = ele.dataset.value;
    eleContent.style.backgroundColor = color;
    saveSetting('backgroundColor', color);
  }

  if (ele.classList.contains("btn-font-size")) {
    let fontSize = parseInt(window.getComputedStyle(eleContent).getPropertyValue("font-size"));
    if (ele.classList.contains("decrease")) {
      fontSize -= 2;
    } else {
      fontSize += 2;
    }
    eleContent.style.fontSize = fontSize + "px";
    saveSetting('fontSize', fontSize + 'px');
  }
});

eleLineHeight.addEventListener('change', function () {
  let value = eleLineHeight.value
  eleContent.style.lineHeight = value;
  saveSetting('lineHeight', value);
});

eleTextAlign.addEventListener('change', function () {
  let value = eleTextAlign.value
  eleContent.style.textAlign = value;
  saveSetting('textAlign', value);
});

function saveSetting(key, value) {
  let data = JSON.parse(localStorage.getItem('dataContent')) || {};
  data[key] = value;
  localStorage.setItem("dataContent", JSON.stringify(data));
}