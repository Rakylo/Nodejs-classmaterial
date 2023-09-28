function dataDisplay(data) {
  // console.log("IND:", data);
  const table = document.querySelector("tbody");
  table.innerHTML = "";

  data.forEach((pet) => {
    const tr = table.insertRow();

    const td1 = tr.insertCell();
    td1.innerText = pet.name;

    const td2 = tr.insertCell();
    td2.innerText = pet.type;

    const td3 = tr.insertCell();
    td3.innerText = pet.age;
  });
}

fetch("http://localhost:3000/")
  .then((res) => res.json())
  .then(dataDisplay);

document.getElementById("age").addEventListener("click", (e) => {
  const text = e.target.textContent;
  if (text.includes("asc")) {
    e.target.textContent = text.replace("asc", "dsc");
    // petSelection = ["dog", "cat", "parrot", "mouse"];
    // orderSelection = "dsc";
    fetch(`http://localhost:3000/${petSelection.join(",")}/${orderSelection}`)
      .then((res) => res.json())
      .then((data) => dataDisplay(data));
  } else {
    e.target.textContent = text.replace("dsc", "asc");
    // petSelection = ["dog", "cat", "parrot", "mouse"];
    // orderSelection = "asc";
    fetch(`
    http://localhost:3000/${petSelection.join(",")}/${orderSelection}`)
      .then((res) => res.json())
      .then((data) => dataDisplay(data));
  }
});
let orderSelection = "asc";
let petSelection = ["dog", "cat", "parrot", "mouse"];

function getData() {
  const response = fetch(
    //join petSelection and orderSelection
    `http://localhost:3000/${petSelection.join(",")}/${orderSelection}`
  )
    .then((res) => res.json())
    .then((data) => dataDisplay(data));
  // console.log(petSelection, orderSelection);
}

getData();

document.querySelectorAll("button").forEach((button) =>
  button.addEventListener("click", (e) => {
    e.target.classList.toggle("color");
    //remove clicket pet from data
    const petClicked = e.target.textContent.toLowerCase();
    const index = petSelection.indexOf(petClicked);
    if (index > -1) {
      petSelection.splice(index, 1);
    } else {
      petSelection.push(petClicked);
    }

    // console.log("END:", petClicked, petSelection);
    getData();
  })
);
