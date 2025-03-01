const jwt = require("jsonwebtoken");

const SendToken = async (user, statusCode, res) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
    refreshToken,
  });
};

module.exports = {
  SendToken,
};