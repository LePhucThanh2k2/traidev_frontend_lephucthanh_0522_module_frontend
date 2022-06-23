var elementHeading = document.getElementById("heading");
var text = elementHeading.innerHTML;
var textArr = text.split(" ");
for (let i = 0; i < textArr.length; i++) {
  if (textArr[i].toLowerCase() === "frontend") {
    text = text.replace(
      new RegExp(textArr[i]),
      "<mark>" + textArr[i] + "</mark>"
    );
    // console.log(text); debug
  }
}
elementHeading.innerHTML = text;
