//C1:
function myValidate1() {
  this.date = " 1";
  this.getDate = function () {
    return this.date;
  };
}
var myObj1 = new myValidate1();
document.write(myObj1.getDate());

//C2:
this.myValidate1 = function () {
  this.date = "this is a test";
  this.getDate = getDate;
  function getDate() {
    return this.date;
  }
};
var myObj1 = new myValidate1();
document.write(myObj1.getDate());

//C3:
var myObj1 = {
  date: "this is a test",
  getDate() {
    return this.date;
  },
};
document.write(myObj1.getDate());
