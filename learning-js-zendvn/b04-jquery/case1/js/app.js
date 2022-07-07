var eleContent = document.getElementById("content");
let config = JSON.parse(localStorage.getItem("dataContent")) || {};
for (const property in config) {
  eleContent.style[property] = config[property];
}
$(function () {
  let fontSize = parseInt($("#content").css("font-size"));
  $(".decrease").click(function (e) {
    fontSize = fontSize - 2;
    $("#content").css("font-size", fontSize + "px");
    saveSetting("fontSize", fontSize + "px");
  });

  $(".increase").click(function (e) {
    fontSize = fontSize + 2;
    $("#content").css("font-size", fontSize + "px");
    saveSetting("fontSize", fontSize + "px");
  });

  $(".btn-background").click(function (e) {
    $("#content").css("background-color", this.dataset.value);
    saveSetting("backgroundColor", this.dataset.value);
  });
  $(".lineHeight").click(function (e) {
    $("#content").css("line-height", this.value);
    saveSetting("lineHeight", this.value);
  });
  $(".textAlign").click(function (e) {
    $("#content").css("text-align", this.value);
    saveSetting("textAlign", this.value);
  });
});
function saveSetting(key, value) {
  let data = JSON.parse(localStorage.getItem("dataContent")) || {};
  data[key] = value;
  localStorage.setItem("dataContent", JSON.stringify(data));
}
