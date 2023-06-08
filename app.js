const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
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

// require("./routes/userRoute")(app);

const doctorRoute = require('./routes/doctorRoute');
const receptionRoute = require( './routes/receptionRoute');
const adminRoute = require( './routes/adminRoute');
const loginRoute = require('./routes/loginRoute');

app.use('/api',loginRoute);
app.use('/api/doctors', doctorRoute);
app.use('/api/receptions',receptionRoute);
app.use('/api/admin', adminRoute);
//add cors validate
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))