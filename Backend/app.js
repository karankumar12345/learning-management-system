const express = require("express");
const { userrouter } = require("./routes/user.route.js");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend
    credentials: true, // Allow cookies/session-based auth
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.json("Test Route ");
});

app.use("/api", userrouter);

module.exports = {
  app,
};