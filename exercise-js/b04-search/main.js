const arrName = [
  "Minor Bisset",
  "Kiri Bernasek",
  "Malia Olenikov",
  "Grazia Glason",
  "Barbey Simion",
  "Dorena Wemes",
  "Shirlee Mc Grath",
  "Tull Leppo",
  "Mandy Jedrysik",
  "Dilly Sinncock",
  "Deena Westnedge",
  "Pat Wawer",
  "Marc Hune",
  "Fleming Aykroyd",
  "Tybalt Kaspar",
  "Araldo Tyson",
  "Sherrie Ashleigh",
  "Norrie Ales0",
  "Jarrad Prettyjohn",
  "Vittoria Hofer",
];
const eleTable = document.getElementById("table");
const eleInput = document.getElementById("input-search");
let str = "";

// display all data out
arrName.forEach((item) => {
  str += " <tr><td>" + item + "</td></tr>";
});
eleTable.innerHTML = str;

// handle search
eleInput.addEventListener("keyup", () => {
  const keys = eleInput.value.toLowerCase();
  let newStr = "";
  let newName = "";
  for (let i = 0; i < arrName.length; i++) {
    const keyWords = new RegExp(keys, "gim");
    const haveKeyword = arrName[i].toLowerCase().includes(keys);
    if (haveKeyword) {
      newName = arrName[i].replace(keyWords, function (match) {
        return "<mark>" + match + "</mark>";
      });
      newStr += " <tr><td>" + newName + "</td></tr>";
    }
  }
  eleTable.innerHTML = newStr;
});
