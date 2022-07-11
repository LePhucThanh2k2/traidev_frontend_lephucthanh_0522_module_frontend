$(function () {
  const tbody = $("tbody");
  const submit = $(".submit");
  const inputAddTask = $(".input-addTask");
  const inputSearch = $(".input-search");
  const select = $(".select");
  const itemSort = $(".dropdown-item");
  const showSortFeature = $(".showSortFeature");

  // idItem to compare with submit
  let idItem = "";
  let configData = JSON.parse(localStorage.getItem("dataToDoList")) || [];
  renderItems(configData);

  //===================== EVENT===============================
  //  Add Task
  submit.click(function (e) {
    let taskName = inputAddTask.val().trim();
    if (taskName) {
      let taskLevel = parseInt(select.val());
      let data = {
        id: idItem ? idItem : createId(12),
        name: taskName,
        level: taskLevel,
      };
      if (idItem) {
        let idx = configData.findIndex((element) => {
          return element.id === idItem;
        });
        configData[idx] = data;
        idItem = "";
      } else {
        configData.unshift(data);
      }
      saveDataAndDisplay();
      // reset form
      inputAddTask.val("");
      select.val(1);
    } else {
      alert("Input Value Can't Be Empty");
    }
  });
  // DELETE AND EDIT
  $(document).click(function (e) {
    ele = e.target;
    let isDelete = $(ele).hasClass("delete");
    let isEdit = $(ele).hasClass("edit");

    if (isDelete) {
      if (confirm("are you sure?")) {
        let id = $(ele).data("id");
        configData = configData.filter(function (obj) {
          return obj.id !== id;
        });
        saveDataAndDisplay();
      }
    }

    if (isEdit) {
      idItem = $(ele).data("id");
      for (let i = 0; i < configData.length; i++) {
        const obj = configData[i];
        if (obj.id === idItem) {
          inputAddTask.val(obj.name);
          select.val(obj.level);
          return;
        }
      }
    }
  });

  // Search
  inputSearch.keyup(function (e) {
    const keys = $(this).val().toLowerCase();
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
  // Sort
  $(itemSort).click(function (e) {
    let nameSort = $(this).text();
    $(showSortFeature).text(nameSort);
    sortFeature($(this).data("value"));
  });

  //===================== FUNCTION===============================
  function renderItems(items, keyword = "") {
    let item = "";
    for (let i = 0; i < items.length; i++) {
      const obj = items[i];
      let newName = obj.name;
      if (keyword) {
        const keyWords = new RegExp(keyword, "gim");
        newName = obj.name.replace(keyWords, function (match) {
          return "<mark>" + match + "</mark>";
        });
      }
      item += createItem(obj, i, newName);
    }
    tbody.html(item);
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

  function sortFeature(value) {
    let [sortBy, sortDir] = value.split("-");

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

    if (sortDir === "desc") configData.reverse();
    saveDataAndDisplay();
  }
});
