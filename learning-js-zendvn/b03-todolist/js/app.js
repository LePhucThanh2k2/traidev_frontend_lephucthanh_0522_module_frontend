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
let idItem = '';

// set data-isedit for input submit

let configData = JSON.parse(localStorage.getItem("dataToDoList")) || [];
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

  let newTodos = configData.filter((todo) => {
    return todo.name.toLowerCase().includes(keys);
  });

  renderItems(newTodos, keys);
});

// Event Add Task
submit.addEventListener("click", () => {
  // check is edit or add
  let taskName = inputAddTask.value.trim();

  if (taskName) {
    let taskLevel = parseInt(select.value);
    let data = {
      id: idItem ? idItem : createId(12),
      name: taskName,
      level: taskLevel
    }

    if (idItem) {
      let idx = configData.findIndex((element) => {
        return element.id === idItem
      });
      configData[idx] = data;
      idItem = '';
    } else {
      configData.unshift(data);
    }
    saveDataAndDisplay();
    inputAddTask.value = "";
    select.value = 1;
  } else {
    alert("Input Value Can't Be Empty");
  }

  // reset form

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

function renderItems(items, keyword = '') {
  let item = "";
  items.forEach((obj, idx) => {
    let newName = obj.name;
    if (keyword) {
      const keyWords = new RegExp(keyword, "gim");
      newName = obj.name.replace(keyWords, function (match) {
        return "<mark>" + match + "</mark>";
      });
    }
    item += createItem(obj, idx, newName);
  });
  tbody.innerHTML = item;
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
  let [sortBy, sortDir] = value.split('-');

  configData.sort(function (a, b) {
    const nameA = a[sortBy].toString().toUpperCase(); // ignore upper and lowercase
    const nameB = b[sortBy].toString().toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  if (sortDir === 'desc') configData.reverse();
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
      <button class="btn btn-warning btn-sm edit"data-id="${obj.id
    }" >Edit</button>
      <button class="btn btn-danger btn-sm delete" data-id ="${obj.id
    }">Delete</button>
    </td>
  </tr>
`;
}
