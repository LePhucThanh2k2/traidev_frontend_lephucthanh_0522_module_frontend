this.myValidate = function () {
  this.date = "null";
  this.getDate = getDate;
  this.setDate = setDate;

  function getDate() {
    return this.date;
  }

  function setDate(val) {
    this.date = val;
  }
};
var myObj = new myValidate();
this.myValidate2 = function () {
  myValidate.call(this);
};
var myObj2 = new myValidate2();
myObj2.setDate("L");
document.write(myObj2.getDate());
