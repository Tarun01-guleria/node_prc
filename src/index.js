const express = require("express");
const fs = require("fs");
const os = require("os");
var _ = require("lodash");
const connectDB = require("./appMongoose.js");

//Instance of express stored in app
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Main Route
app.get("/", (req, res) => {
  res.send("This is response from backend server");
});

//importing routing files

const personRoutes = require("./routes/person.route.js");
const menuItemRoutes = require("./routes/menu.route.js");

//Using the routers
app.use("/", personRoutes);
app.use("/", menuItemRoutes);

app.listen(8000, () => {
  console.log("Server is running ");
});
