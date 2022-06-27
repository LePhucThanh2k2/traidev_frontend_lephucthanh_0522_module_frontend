//C1:
const enter = "</br>";
function myValidate1() {
  var date = "this is a test";
  this.getDate = getDate;
  function getDate() {
    return date;
  }
}
var myObj1 = new myValidate1();
document.write(myObj1.getDate() + enter);

//C2:
this.myValidate1 = function () {
  var date = "this is a test1";
  this.getDate = getDate;
  function getDate() {
    return date;
  }
};
var myObj2 = new myValidate1();
document.write(myObj2.getDate() + enter);

//C3: // Not used private
// var myObj1 = {
//   date: "this is a test",
// };
