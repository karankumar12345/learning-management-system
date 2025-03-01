const express = require("express");
const { RegisterController } = require("../controllers/user.controller.js");

const userrouter = express.Router();

userrouter.post("/register", RegisterController);

module.exports = {
  userrouter,
};