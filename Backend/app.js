const express = require("express");
const { userrouter } = require("./routes/user.route.js");
const cors = require("cors");

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.json("Test Route ");
});

app.use("/api/v1/user", userrouter);

module.exports = {
  app,
};