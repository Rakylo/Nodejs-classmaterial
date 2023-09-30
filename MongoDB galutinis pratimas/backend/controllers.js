import mongoose from "mongoose";
import Memberships from "./models/Memberships.js";
import Users from "./models/Users.js";

export async function postMembership(req, res) {
  const { name, price, description } = req.body;
  // Check if a membership with the same name already exists
  const existingMembership = await Memberships.findOne({ name });
  console.log(existingMembership);
  try {
    if (existingMembership) {
      // If a membership with the same name exists
      return res
        .status(400)
        .json({ error: "Membership with this name already exists." });
    }
    const added = new Memberships({ name, price, description });
    await added.save();
    res.json(added);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function postUsers(req, res) {
  const { name, surname, email, membership } = req.body;
  try {
    // Check if a user with the same email already exists
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      // If a user with the same email exists, you can handle it here
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }
    // Create a new user document
    const user = new Users({ name, surname, email, membership });

    // Save the user document to the database
    await user.save();

    // If 'membership' is not null, search for the membership by name
    if (membership) {
      const membershipDoc = await Memberships.findOne({ name: membership });
      console.log(membershipDoc);
      if (membershipDoc) {
        membershipDoc.users.push(user._id); // Add the user to the membership's 'users' array
        await membershipDoc.save();
      }
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function addUsersToMembership(req, res) {
  const { personId, groupId } = req.params;
  try {
    const group = await Memberships.findById(groupId);
    const personMongoId = new mongoose.Types.ObjectId(personId);

    // Fix the typo here: Change `group.Membership` to `group.membership`
    group.memberships.push(personMongoId);
    await group.save();

    const person = await Users.findById(personId);

    const groupMongoId = new mongoose.Types.ObjectId(groupId);
    person.group = groupMongoId;

    await person.save();

    res.json({ message: "User is added to group" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getMembershipIdByName(req, res) {
  try {
    const membershipName = req.params.name;
    console.log(membershipName);
    const membershipToGet = await Memberships.findOne({
      name: membershipName,
    });
    if (!membershipToGet) {
      return res.status(404).json({ message: "Membership not found" });
    }
    const getResult = await Memberships.findOne(membershipToGet);
    if (getResult) {
      return res.status(200).json(membershipToGet);
    } else {
      return res.status(500).json({ message: "Failed to get membership" });
    }
  } catch (error) {
    console.error("Error getting membership:", error);
    return res.status(500).json({ message: "Internal Server Error" });
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

export async function getMembershipById(req, res) {
  try {
    const membershipId = req.params.id;
    const membership = await Memberships.findById(membershipId);
    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }
    return res.status(200).json(membership);
  } catch (error) {
    console.error("Error getting membership by id:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
