const cancelButtons = document.querySelector("#cancelButton");
const newMembershipButton = document.querySelector("#newButton");

cancelButtons.addEventListener("click", () => {
  window.location.href = "memberships.html";
});

newMembershipButton.addEventListener("click", () => {
  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const description = document.querySelector("#description").value;

  const membership = {
    name,
    price,
    description,
  };

  fetch("http://localhost:3000/memberships", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(membership),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = "memberships.html";
    });
});
