//C1:
function myValidate1() {
  this.date = "this is a test";
}
var myObj1 = new myValidate1();
document.write(myObj1.date);

//C2:
this.myValidate1 = function () {
  this.date = "this is a test";
};
var myObj1 = new myValidate1();
document.write(myObj1.date);

//C3:
var myObj1 = {
  date: "this is a test",
};
document.write(myObj1.date);
