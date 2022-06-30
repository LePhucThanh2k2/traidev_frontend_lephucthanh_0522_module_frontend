this.myBox = function () {
  this.createBox = createBox;
  this.createBox = createBox;

  function createBox(arr, str) {
    var result = "";
    var style = createAttribute(arr);

    result = "<div style='" + style + "'>" + str + "</div>";
    return result;
  }
  function createAttribute(arr) {
    var style = "text-align: center";
    style += ";width: " + arr[0];
    style += ";height: " + arr[1];
    style += ";line-height: " + arr[1];
    style += ";color: " + arr[2];
    style += ";background-color: " + arr[3];
    return style;
  }
};
var box1 = new myBox();
document.write(box1.createBox(["200px", "200px", "#000", "aqua"], "Box1"));
document.write(box1.createBox(["500px", "500px", "#000", "yellow"], "Box2"));
document.write(box1.createBox(["100px", "100px", "#000", "red"], "Box3"));
