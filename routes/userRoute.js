const express = require ("express");
const Users = require("../models/userModel");
const app = express ();

module.exports = function (app) {
  app.post("/login", async (request, response) => {
     try {
       const loginData = await request.body;
       const users = await Users.find({});
       users.foreach(user => {
            if (loginData.name == user.name && loginData.password == user.password)
                    response.status(200).json(user)
            })
     } catch (error) {
            console.log(error.message);
            response.status(500).json({ message: error.message });
        }
  });

  app.post("/user", async (request, response) => {
    try {
      const user = await Users.create(request.body);
      response.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });

  app.get("/users", async (request, response) => {
    try {
      const users = await Users.find({});
      response.status(200).json(users);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });

  app.get("/users/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const user = await Users.findById(id);
      response.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });

  app.put("/users/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const user = await Users.findByIdAndUpdate(id, request.body);
      if (!user)
        response.status(404).json({ message: `cannot find user with id ${id} !` });
      else {
        const newUser = await Users.findById(id);
        response.status(200).json(newUser);
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });

  app.delete("/users/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const user = await Users.findByIdAndDelete(id);
      if (!user)
        response.status(404).json({ message: `cannot find user with id ${id} !` });
      else response.status(200).json({ message: "user delete from users" });
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });
};
