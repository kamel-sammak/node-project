const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const databaseUrl = "mongodb://127.0.0.1:27017/CMS";
const Users = require("./models/userModel");

//use middleware
app.use(express.json()); // this to active send data with json type
app.use(express.urlencoded({ extended: false })); // this to active send data with form type

//connect to mongoDB and start listen on port
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Connected to CMS!");
    app.listen(port, () => {
      console.log("listen on port 3000 in local host");
    });
  })
  .catch(() => console.log(error));

//routes
app.get("/", (req, res) => {
  res.send("node api");
});

//create API
app.post("/user", async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByIdAndUpdate(id, req.body);
    if (!user)
      res.status(404).json({ message: `cannot find user with id ${id} !` });
    else {
      const newUser = await Users.findById(id);
      res.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByIdAndDelete(id);
    if (!user)
      res.status(404).json({ message: `cannot find user with id ${id} !` });
    else res.status(200).json({ message: "user delete from users" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
