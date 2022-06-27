var eleFullName = document.getElementById("fullname");
var eleEmail = document.getElementById("email");
var elePhone = document.getElementById("phone");
var eleJob = document.querySelector("#job");
var btn = document.getElementById("btn-send-contact");
var date = [];
console.log(eleJob.textContent);
function loadingDate() {
  date[0] = eleFullName.value;
  date[1] = eleEmail.value;
  date[2] = elePhone.value;
  date[3] = eleJob.value;
  localStorage.setItem("dateInput", date);
}
btn.addEventListener("click", loadingDate);

window.onload = function () {
  const date = localStorage.getItem("dateInput");
  var dateArr = [];
  dateArr = date.split(",");
  eleFullName.value = dateArr[0];
  eleEmail.value = dateArr[1];
  elePhone.value = dateArr[2];
  eleJob.value = dateArr[3];
};
