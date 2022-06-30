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
let item = "";
let idItem = 0;
renderItems(todos);
submit.dataset.isedit = "false";

// EVENTS
document.addEventListener("click", (e) => {
  ele = e.target;

  if (ele.classList.contains("delete")) {
    if (confirm("are you sure?")) {
      let id = ele.dataset.id;
      todos = todos.filter(function (obj) {
        return obj.id !== id;
      });

      renderItems(todos);
    }
  }

  if (ele.classList.contains("edit")) {
    // set isEdit= true for submit
    submit.dataset.isedit = "true";
    idItem = ele.dataset.id;
    todos.forEach((obj) => {
      if (obj.id === idItem) {
        // display data out form
        inputAddTask.value = obj.name;
        select.value = obj.level;
      }
    });
  }
});

// Event Search
inputSearch.addEventListener("keyup", () => {
  const keys = inputSearch.value.toLowerCase();
  if (keys === "") {
    renderItems(todos);
    return;
  }
  let itemList = "";
  let newName = "";

  for (let i = 0; i < todos.length; i++) {
    const keyWords = new RegExp(keys, "gim");
    const element = todos[i];
    const haveKeyword = element.name.toLowerCase().includes(keys);
    if (haveKeyword) {
      newName = element.name.replace(keyWords, function (match) {
        return "<mark>" + match + "</mark>";
      });
      itemList += `
      <tr>
        <th>${i + 1}</th>
        <td>${newName}</td>
        <td>
        ${handleBadge(element.level)}
          
        </td>
        <td>
          <button class="btn btn-warning btn-sm edit"data-id="${
            element.id
          }" >Edit</button>
          <button class="btn btn-danger btn-sm delete" data-id ="${
            element.id
          }">Delete</button>
        </td>
      </tr>
    `;
    }
  }
  tbody.innerHTML = itemList;
});

// Event Add Task
submit.addEventListener("click", () => {
  if (submit.dataset.isedit === "true") {
    todos.forEach((obj) => {
      if (obj.id === idItem) {
        obj.name = inputAddTask.value;
        obj.level = parseInt(select.value);
      }
    });
    renderItems(todos);

    // reset submit
    submit.dataset.isedit = "false";
  } else {
    const data = {};
    data.id = createId(12);
    if (inputAddTask.value !== "") {
      data.name = inputAddTask.value;
      data.level = parseInt(select.value);
      todos.unshift(data);
      renderItems(todos);
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
    sortFeature(item.dataset.value);
    console.log(item.dataset.value);
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
    item += `
      <tr>
        <th>${idx + 1}</th>
        <td>${obj.name}</td>
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
    todos.sort(function (a, b) {
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
    renderItems(todos);
  }
  if (value === "name-desc") {
    todos
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
    renderItems(todos);
  }
  if (value === "level-asc") {
    todos.sort(function (a, b) {
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
    renderItems(todos);
  }
  if (value === "level-desc") {
    todos
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
    renderItems(todos);
  }
}
