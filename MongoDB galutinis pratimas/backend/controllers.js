import mongoose from "mongoose";
import Memberships from "./models/Memberships.js";
import Users from "./models/Users.js";

// const membership_arr = ["Trial", "Silver", "Bronze", "Gold", "Platinum"];

export async function postMemberships(req, res) {
  const { name, price, description } = req.body;
  try {
    const added = new Memberships({ name, price, description });
    await added.save();
    res.json(added);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function postUsers(req, res) {
  const { name, surname, email, membership } = req.body;
  const membership_id = await Memberships.find({ name: membership });

  if (!membership_id) {
    res.status(400).json({ error: "Wrong membership id" });
    return;
  }
  try {
    const added = new Users({
      name,
      surname,
      email,
    });
    await added.save();
    res.json(added);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteMembershipByName(req, res) {
  try {
    const membershipName = req.params.name;
    const membershipToDelete = await Memberships.findOne({
      name: membershipName,
    });
    if (!membershipToDelete) {
      return res.status(404).json({ message: "Membership not found" });
    }
    const deletionResult = await Memberships.deleteOne(membershipToDelete);
    if (deletionResult) {
      return res
        .status(200)
        .json({ message: "Membership deleted successfully" });
    } else {
      return res.status(500).json({ message: "Failed to delete membership" });
    }
  } catch (error) {
    console.error("Error deleting membership:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteUserByName(req, res) {
  try {
    const userName = req.params.name;
    const userToDelete = await Users.findOne({ name: userName });
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }
    const deletionResult = await Users.deleteOne(userToDelete);
    if (deletionResult) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(500).json({ message: "Failed to delete user" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMemberships(req, res) {
  try {
    const memberships = await Memberships.find();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUsersByOrder(req, res) {
  try {
    let order = req.params.order;
    // console.log(order);
    if (order === "asc") {
      // get ascending order from db
      // console.log(order);
      const users = await Users.find().sort({ name: 1 });
      res.json(users);
    } else {
      if (order === "dsc") {
        // get descending order from db
        const users = await Users.find().sort({ name: -1 });
        res.json(users);
      } else {
        // get default order from db
        const users = await Users.find();
        res.json(users);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// export async function getMembershipById(req, res) {
//   try {
//     const membershipId = req.params.id;
//     const membership = await Memberships.findById(membershipId);
//     if (!membership) {
//       return res.status(404).json({ message: "Membership not found" });
//     }
//     return res.status(200).json(membership);
//   } catch (error) {
//     console.error("Error getting membership by id:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

export async function getMembershipNamefromUserId(req, res) {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const membership = await Memberships.findById(id).populate("users");
    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }
    return res.status(200).json(membership.name);
  } catch (error) {
    console.error("Error getting membership by id:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
