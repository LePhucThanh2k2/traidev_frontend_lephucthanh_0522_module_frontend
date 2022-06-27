const eleInput = document.getElementById("input-name");
const eleLastName = document.querySelector(".lastName");
const eleMiddleName = document.querySelector(".middleName");
const eleName = document.querySelector(".name");

function output() {
  const valueInput = eleInput.value;
  const firstSpace = valueInput.indexOf(" ");
  const endSpace = valueInput.lastIndexOf(" ");

  const lastName = valueInput.slice(0, firstSpace);
  const middleName = valueInput.slice(firstSpace, endSpace);
  const name = valueInput.slice(endSpace);
  eleLastName.textContent = lastName;
  eleMiddleName.textContent = middleName;
  eleName.textContent = name;
}
