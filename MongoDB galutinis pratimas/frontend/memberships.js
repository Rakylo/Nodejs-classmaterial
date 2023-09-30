const HOST = "http://localhost:3000";

const div1 = document.querySelector(".div1");
const frame1 = document.querySelector(".frame1");
const frame2 = document.querySelector(".frame2");
const headerText = document.querySelector(".header-text");
// ******************************************************
let memberships2 = [];

async function getMemberships() {
  try {
    const response = await fetch(`${HOST}/memberships`);
    if (response.ok) {
      const data = await response.json();
      memberships2 = data;
      return memberships2;
    } else {
      alert("Something went wrong");
    }
  } catch (error) {
    alert("Catch Something went wrong");
  }
}
const memberships = await getMemberships();
console.log(memberships);

// ******************************************************
function generateMembershipsHtml() {
  frame2.innerHTML = "";

  const membershipMananger = document.createElement("h1");
  membershipMananger.textContent = "Membership Management";

  const manage = document.createElement("h4");
  manage.textContent =
    "Here you can manage your membership packages. Note: Make sure you are not deleting or deadctivating packages assigned to active users";

  const addMembershipButton = document.createElement("button");
  addMembershipButton.textContent = "Add New Membership";
  addMembershipButton.classList.add("add-membership-button");

  const newMemberDiv = document.createElement("div");
  newMemberDiv.classList.add("new-member-div");
  newMemberDiv.append(addMembershipButton);
  headerText.append(newMemberDiv);

  headerText.append(membershipMananger, manage);

  memberships.forEach((membership) => {
    const membershipContainer = document.createElement("div");
    membershipContainer.classList.add("membership-container");

    const name = document.createElement("h3");
    name.textContent = "$" + membership.price + " " + membership.name;
    name.classList.add("membership-name");

    const description = document.createElement("h5");
    description.textContent = membership.description;
    description.classList.add("membership-description");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete?")) {
        try {
          const response = await fetch(HOST + `/${membership.id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            membershipContainer.remove();
          } else {
            alert("Something went wrong");
          }
        } catch (error) {
          alert("Something went wrong");
        }
      }
    });

    membershipContainer.append(name, description, deleteButton);
    frame2.append(membershipContainer);
  });
}

function createNewMembership() {
  frame2.innerHTML = "";
  frame2.className = "frame3";

  const newMembershipContainer = document.createElement("div");
  newMembershipContainer.classList.add("new-membership-container");

  const newMembershipName = document.createElement("input");
  newMembershipName.classList.add("new-membership-name");
  newMembershipName.placeholder = "Membership Name";

  const newMembershipPrice = document.createElement("input");
  newMembershipPrice.classList.add("new-membership-price");
  newMembershipPrice.placeholder = "Membership Price";

  const newMembershipDescription = document.createElement("input");
  newMembershipDescription.classList.add("new-membership-description");
  newMembershipDescription.placeholder = "Membership Description";

  const newMembershipButton = document.createElement("button");
  newMembershipButton.textContent = "Add Membership";
  newMembershipButton.classList.add("new-membership-button");

  newMembershipButton.addEventListener("click", async () => {
    const newMembershipNameValue = newMembershipName.value;
    const newMembershipPriceValue = newMembershipPrice.value;
    const newMembershipDescriptionValue = newMembershipDescription.value;

    try {
      const response = await fetch(HOST + `/memberships`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newMembershipNameValue,
          price: newMembershipPriceValue,
          description: newMembershipDescriptionValue,
        }),
      });
      if (response.ok) {
        alert("Membership Added");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  });

  newMembershipContainer.append(
    newMembershipName,
    newMembershipPrice,
    newMembershipDescription,
    newMembershipButton
  );
  frame2.append(newMembershipContainer);
}
// createNewMembership();
getMemberships();
generateMembershipsHtml();

// ******************************************************

const addMembershipButton = document.querySelector(".add-membership-button");
addMembershipButton.addEventListener("click", () => {
  window.location.href = "createMembership.html";
});
