const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const emailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your Name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      validate: {
        validator: (value) => emailRegix.test(value),
        message: "Please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your Password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    courses: [
      {
        _id: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = async function (enterPassword) {
  console.log("Comparing Entered Passwword :", enterPassword);
  console.log("With Stored Password", this.password);
  return bcrypt.compareSync(enterPassword, this.password);
};

userSchema.methods.SignAccessToken = function () {
  const accessToken = jwt.sign(
    { id: this._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
  return accessToken;
};

userSchema.methods.SignRefreshToken = function () {
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "3d" }
  );
  return refreshToken;
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);