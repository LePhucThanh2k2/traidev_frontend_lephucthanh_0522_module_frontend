var elementHeading = document.getElementById("heading");
var text = elementHeading.innerHTML;
let newText = text.replace(/frontend/gi, "<mark>frontend</mark>");
elementHeading.innerHTML = newText;
