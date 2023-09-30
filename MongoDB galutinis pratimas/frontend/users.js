const HOST = "http://localhost:3000";

const div1 = document.querySelector(".div1");
const frame1 = document.querySelector(".frame1");
const frame2 = document.querySelector(".frame2");
const headerText = document.querySelector(".header-text");
// ******************************************************
let users = [];

async function getUsers() {
  try {
    const response = await fetch(`${HOST}/users/asc`);
    if (response.ok) {
      const data = await response.json();
      users = data;
      return users;
    } else {
      alert("Something went wrong");
    }
  } catch (error) {
    alert("Catch Something went wrong");
  }
}
const usersAll = await getUsers();
// console.log(usersAll);

// ******************************************************
// let member = [];
// async function getMembershipById(id) {
//   try {
//     console.log(`F: ${id}`);
//     const response = await fetch(`${HOST}`);
//     if (response.ok) {
//       const data = await response.json();
//       member = data;
//       return member;
//     } else {
//       alert("Something went wrong");
//     }
//   } catch (error) {
//     alert("Catch Something went wrong");
//   }
// }

async function generateUsersHtml() {
  frame2.innerHTML = "";

  const userContainer = document.createElement("div");
  userContainer.classList.add("user-container");

  const membershipMananger = document.createElement("h1");
  membershipMananger.textContent = "User Management";

  const manage = document.createElement("h4");
  manage.textContent = "Sorting By name: ";

  const addMembershipButton = document.createElement("button");
  addMembershipButton.textContent = "Add New Membership";
  addMembershipButton.classList.add("add-membership-button");

  const newMemberDiv = document.createElement("div");
  newMemberDiv.classList.add("new-member-div");
  newMemberDiv.append(addMembershipButton);
  headerText.append(newMemberDiv);

  headerText.append(membershipMananger, manage);

  usersAll.forEach(async (user) => {
    const userContainer = document.createElement("div");
    userContainer.classList.add("user-container");

    const name = document.createElement("h3");
    name.textContent = user.name + " " + user.surname;
    name.classList.add("user-name");

    const userEmail = document.createElement("h5");
    userEmail.textContent = `Email: ${user.email}`;
    userEmail.classList.add("email-container");

    const userId = document.createElement("h5");
    userId.textContent = `User ID: ${user._id}`;
    userId.classList.add("id-container");

    const membership = document.createElement("h5");
    membership.textContent = `Membership: ${user.membership} `;

    // membership.classList.add("membership-container");
    userContainer.append(name, userEmail, membership, userId);
    frame2.append(userContainer);
  });
}

generateUsersHtml();

// ******************************************************
// function generateUsersHtml() {
//   frame2.innerHTML = "";

// const userContainer = document.createElement("div");
// userContainer.classList.add("user-container");

//   const membershipMananger = document.createElement("h1");
//   membershipMananger.textContent = "User Management";

//   const manage = document.createElement("h4");
//   manage.textContent = "Sorting By name: ";

//   const addMembershipButton = document.createElement("button");
//   addMembershipButton.textContent = "Add New Membership";
//   addMembershipButton.classList.add("add-membership-button");

//   const newMemberDiv = document.createElement("div");
//   newMemberDiv.classList.add("new-member-div");
//   newMemberDiv.append(addMembershipButton);
//   headerText.append(newMemberDiv);

//   headerText.append(membershipMananger, manage);

//   usersAll.forEach(async (user) => {
//     const userContainer = document.createElement("div");
//     userContainer.classList.add("user-container");

//     const name = document.createElement("h3");
//     name.textContent = user.name;
//     name.classList.add("user-name");

//     const userEmail = document.createElement("h5");
//     userEmail.textContent = user.email;
//     userEmail.classList.add("email-container");

//     const userId = document.createElement("h5");
//     userId.textContent = user._id;
//     userId.classList.add("id-container");

//     const membership_id = user.membership_id;
//     console.log(membership_id);

//     const member = await getMembershipById(membership_id);
//     // console.log({ member: name });

//     const membership = document.createElement("h5");
//     // membership.textContent = membership;
//     membership.textContent = member.name;
//     membership.classList.add("user-name");

//     userContainer.append(name, userEmail, membership, userId);
//     frame2.append(userContainer);
//   });
// }

getUsers();
// generateUsersHtml();
