const date = new Date();
const eleDate = document.getElementById("date");
const btnSubmit = document.querySelector(".btn-submit");
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1;
const currentDay = date.getDate();
const currentSecond = date.getSeconds();
const currentMinute = date.getMinutes();
const currentHours = date.getHours();
btnSubmit.addEventListener("click", () => {
  eleDate.innerHTML = `
  ${currentHours < 10 ? "0" + currentHours : currentHours} 
 :
  ${currentMinute < 10 ? "0" + currentMinute : currentMinute} 
 :
  ${currentSecond < 10 ? "0" + currentSecond : currentSecond} 
   -
  ${currentDay < 10 ? "0" + currentDay : currentDay}
  /
  ${currentMonth < 10 ? "0" + currentMonth : currentMonth}
  /
  ${currentYear}
  `;
});
