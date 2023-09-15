const HOST = "http://localhost:3000";
// const PORT = 3000;

const container = document.querySelector("#container");

async function getBrands() {
  try {
    const response = await fetch(HOST);
    if (response.ok) {
      const brandai = await response.json();
      console.log(brandai);
      atvaizduoju(brandai);
    } else {
      console.log("kazkas neivyko");
    }
  } catch (error) {
    console.log(error);
  }
}

getBrands();

function atvaizduoju(brandai) {
  const ul = document.createElement("ul");

  const li1 = document.createElement("li");
  li1.textContent = brandai[0];
  const li2 = document.createElement("li");
  li2.textContent = brandai[1];
  const li3 = document.createElement("li");
  li3.textContent = brandai[2];

  ul.append(li1, li2, li3);
  container.append(ul);
}
