const express = require("express");
const Users = require("../models/userModel");

const router = express.Router();

router.post("/login", async (request, response) => {
  try {
    const { userName, password } = request.body;
    const user = await Users.findOne({ userName });
    var isMatch = false;
    if (user) isMatch = await (password === user.password);
    if (!user || !isMatch)
      return response
        .status(400)
        .json({ error: "Invalid USERNAME or PASSWORD" });
    if (user && isMatch) return response.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

router.post("/", async (request, response) => {
  try {
    const user = await Users.create(request.body);
    response.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

router.get("/", async (request, response) => {
  try {
    const users = await Users.find({});
    response.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await Users.findById(id);
    response.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await Users.findByIdAndUpdate(id, request.body);
    if (!user)
      response
        .status(404)
        .json({ message: `cannot find user with id ${id} !` });
    else {
      const newUser = await Users.findById(id);
      response.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await Users.findByIdAndDelete(id);
    if (!user)
      response
        .status(404)
        .json({ message: `cannot find user with id ${id} !` });
    else response.status(200).json({ message: "user delete from users" });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

module.exports = router;
