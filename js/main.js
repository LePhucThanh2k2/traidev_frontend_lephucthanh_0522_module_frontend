var boxList = document.querySelectorAll(".box");
var maxHeight = 0;
for (let i = 0; i < boxList.length; i++) {
  maxHeight = boxList[0].offsetHeight;
  if (maxHeight < boxList[i].offsetHeight) maxHeight = boxList[i].offsetHeight;
}
for (let i = 0; i < boxList.length; i++) {
  boxList[i].style.height = maxHeight + "px";
  boxList[i].style.backgroundColor = "yellow";

  if (i % 2 === 0) {
    boxList[i].style.backgroundColor = "red";
  }
}
