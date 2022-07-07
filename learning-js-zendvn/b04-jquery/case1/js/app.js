
$(function () {
  var eleContent = $("#content");
  let config = JSON.parse(localStorage.getItem("dataContent")) || {};
  for (const property in config) {
    eleContent.css(property, config[property]);
  }


  $('.btn-font-size').on('click', function () {
    let fontSize = parseInt(eleContent.css("font-size"));
    if ($(this).hasClass('increase')) {
      fontSize += 2;
    } else {
      fontSize -= 2;
    }
    
    eleContent.css("font-size", fontSize + "px");
    saveSetting("fontSize", fontSize + "px");
  })

  $(".btn-background").click(function (e) {
    let btn = $(this);
    eleContent.css("background-color", btn.data('value'));
    saveSetting("backgroundColor", btn.data('value'));
  });
  $(".lineHeight").click(function (e) {
    eleContent.css("line-height", $(this).val());
    saveSetting("lineHeight", $(this).val());
  });
  $(".textAlign").click(function (e) {
    eleContent.css("text-align", $(this).val());
    saveSetting("textAlign", $(this).val());
  });
});
function saveSetting(key, value) {
  let data = JSON.parse(localStorage.getItem("dataContent")) || {};
  data[key] = value;
  localStorage.setItem("dataContent", JSON.stringify(data));
}
