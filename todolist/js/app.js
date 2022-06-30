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
let item = "";
todos.forEach((obj, idx) => {
  item += `
    <tr>
      <th>${idx + 1}</th>
      <td>${obj.name}</td>
      <td>
      ${handleBadge(obj.level)}
        
      </td>
      <td>
        <button class="btn btn-warning btn-sm">Edit</button>
        <button class='btn btn-danger btn-sm delete data-id ="${
          obj.id
        }">Delete</button>
      </td>
    </tr>
  `;
  tbody.innerHTML = item;
});

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

document.addEventListener("click", (e) => {
  ele = e.target;
  let id = "";
  let newArr = [];
  if (ele.classList.contains("delete")) {
    id = ele.dataset.id;
    todos.forEach((obj, idx) => {
      if (obj.id === id) newArr.push(obj);
    });
  }
  todos.filter(() => newArr);
  console.log(newArr);
  console.log(todos);
});
