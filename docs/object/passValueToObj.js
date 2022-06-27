//C1:
// function myValidate1(val1) {
//   this.date = val1;
//   //   var date = val1;
//   this.getDate = function () {
//     return this.date;
//   };
// }

//C2:
this.myValidate1 = function (val1) {
  this.date = val1;

  this.getDate = getDate;
  this.setDate = setDate;

  function getDate() {
    return this.date;
  }
  function setDate(val) {
    this.date = val;
  }
};

var myObj1 = new myValidate1("1");
myObj1.setDate("2");
document.write(myObj1.getDate());
//C3:
// var myObj1 = function (val1) {
//   var date = val1;
//   function getDate() {
//     return this.date;
//   }
// };
