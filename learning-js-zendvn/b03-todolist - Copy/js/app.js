let todos = [
  {
    id: "62914e5b-ef73-430f-a89e-3aeb115cba63",
    name: "in tempus sit amet sem",
    level: 2,
  },
  {
    id: "8a623f0c-737e-49fc-8064-c76535071eb1",
    name: "in est risus auctor",
    level: 1,
  },
  {
    id: "d7434df7-8601-4ce2-89f1-ab8004ad0645",
    name: "hac habitasse platea dictumst etiam faucibus cursus urna ut tellus",
    level: 2,
  },
  {
    id: "13327097-a3f8-4a90-8ce0-2b8c045504fa",
    name: "justo in hac habitasse",
    level: 1,
  },
  {
    id: "e1fe9172-3586-4f3a-86da-99457310d0b7",
    name: "mi nulla ac enim",
    level: 3,
  },
  {
    id: "6da77e96-266f-4b21-b5b3-f347409fe4c9",
    name: "a ipsum integer a nibh",
    level: 1,
  },
  {
    id: "c921f661-1aea-4878-ad0b-f9d7cf189ef5",
    name: "eu felis fusce posuere felis sed lacus",
    level: 3,
  },
  {
    id: "9f5194ff-5dc2-4ae1-822e-b528fcd6aa95",
    name: "molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque",
    level: 3,
  },
  {
    id: "e1958e9d-eccd-46e4-9f24-fafae91d2b1c",
    name: "morbi quis",
    level: 3,
  },
  {
    id: "27ccdf63-11c0-4e8f-a9b0-93d3c0350c33",
    name: "sollicitudin vitae",
    level: 1,
  },
];

const badge = document.querySelector(".badge");
const tbody = document.querySelector("tbody");
const elementDelete = document.querySelector(".delete");
const submit = document.querySelector(".submit");
const inputAddTask = document.querySelector(".input-addTask");
const inputSearch = document.querySelector(".input-search");
const select = document.querySelector(".select");
const sortList = document.querySelectorAll(".dropdown-item");
const showSortFeature = document.querySelector(".showSortFeature");

// idItem to compare with submit
let idItem = 0;

// set data-isedit for input submit
submit.dataset.isedit = "false";

let configData = JSON.parse(localStorage.getItem("dataToDoList")) || todos;
renderItems(configData);

// EVENTS
document.addEventListener("click", (e) => {
  ele = e.target;

  // DELETE
  if (ele.classList.contains("delete")) {
    if (confirm("are you sure?")) {
      let id = ele.dataset.id;
      configData = configData.filter(function (obj) {
        return obj.id !== id;
      });
      saveDataAndDisplay();
    }
  }

  // EDIT
  if (ele.classList.contains("edit")) {
    // set isEdit = true for submit
    submit.dataset.isedit = "true";

    idItem = ele.dataset.id;
    configData.forEach((obj) => {
      if (obj.id === idItem) {
        // display data out form
        inputAddTask.value = obj.name;
        select.value = obj.level;
      }
    });
  }
});

// Handle Search Feature
inputSearch.addEventListener("keyup", () => {
  const keys = inputSearch.value.toLowerCase();
  // if the form input search is empty return original data
  if (keys === "") {
    saveDataAndDisplay();
    return;
  }
  // reset form
  let itemList = "";
  let newName = "";

  for (let i = 0; i < configData.length; i++) {
    const keyWords = new RegExp(keys, "gim");
    const element = configData[i];
    const haveKeyword = element.name.toLowerCase().includes(keys);
    if (haveKeyword) {
      newName = element.name.replace(keyWords, function (match) {
        return "<mark>" + match + "</mark>";
      });
      itemList += createItem(element, i, newName);
    }
  }
  tbody.innerHTML = itemList;
});

// Event Add Task
submit.addEventListener("click", () => {
  // check is edit or add
  // if isedit = true is edit
  if (submit.dataset.isedit === "true") {
    configData.forEach((obj) => {
      if (obj.id === idItem) {
        if (inputAddTask.value !== "") {
          obj.name = inputAddTask.value;
          obj.level = parseInt(select.value);
        } else {
          alert("Input Value Can't Be Empty");
        }
      }
    });
    saveDataAndDisplay();

    // reset submit
    submit.dataset.isedit = "false";
  } else {
    const data = {};
    data.id = createId(12);
    if (inputAddTask.value !== "") {
      data.name = inputAddTask.value;
      data.level = parseInt(select.value);
      configData.unshift(data);
      saveDataAndDisplay();
    } else {
      alert("Please Enter Value On Input");
    }
  }

  // reset form
  inputAddTask.value = "";
  select.value = 1;
});

// Event Sort
sortList.forEach((item) => {
  item.addEventListener("click", () => {
    showSortFeature.textContent = item.textContent.toUpperCase();
    // item.dataset.value is the name of the feature(name-asc|name-desc|level-asc|level-desc)
    sortFeature(item.dataset.value);
  });
});

// FUNCTIONS
function handleBadge(n) {
  let badge = "";
  let bgcColor = "";
  if (n === 1) {
    badge = "Small";
    bgcColor = "text-bg-secondary";
  } else if (n === 2) {
    badge = "Medium";
    bgcColor = "text-bg-info";
  } else {
    badge = "High";
    bgcColor = "text-bg-danger";
  }
  return `<span class="badge ${bgcColor}">${badge}</span>`;
}

function renderItems(items) {
  let item = "";
  items.forEach((obj, idx) => {
    item += createItem(obj, idx, obj.name);
    tbody.innerHTML = item;
  });
}

function createId(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function sortFeature(value) {
  if (value === "name-asc") {
    configData.sort(function (a, b) {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  if (value === "name-desc") {
    configData
      .sort(function (a, b) {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
      .reverse();
  }

  if (value === "level-asc") {
    configData.sort(function (a, b) {
      const levelA = a.level; // ignore upper and lowercase
      const levelB = b.level; // ignore upper and lowercase
      if (levelA < levelB) {
        return -1;
      }
      if (levelA > levelB) {
        return 1;
      }
      return 0;
    });
  }

  if (value === "level-desc") {
    configData
      .sort(function (a, b) {
        const levelA = a.level; // ignore upper and lowercase
        const levelB = b.level; // ignore upper and lowercase
        if (levelA < levelB) {
          return -1;
        }
        if (levelA > levelB) {
          return 1;
        }
        return 0;
      })
      .reverse();
  }
  saveDataAndDisplay();
}

function saveDataAndDisplay() {
  localStorage.setItem("dataToDoList", JSON.stringify(configData));
  renderItems(configData);
}

function createItem(obj, idx, name) {
  return `
  <tr>
    <th>${idx + 1}</th>
    <td>${name}</td>
    <td>
    ${handleBadge(obj.level)}
      
    </td>
    <td>
      <button class="btn btn-warning btn-sm edit"data-id="${
        obj.id
      }" >Edit</button>
      <button class="btn btn-danger btn-sm delete" data-id ="${
        obj.id
      }">Delete</button>
    </td>
  </tr>
`;
}
