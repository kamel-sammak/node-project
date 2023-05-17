const express = require("express");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");

const app = express();
const port = 3000;
const databaseUrl = "mongodb://127.0.0.1:27017/CMS";

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

require("./routes/userRoute")(app);
require("./routes/doctorsRoute")(app);
//use jwt
