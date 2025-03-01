const errorMiddleWare = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
  
    if (err.name === "CastError") {
      err.message = `Resource Not Found. Invalid ${err.path}`;
      err.statusCode = 400;
    }
    if (err.code === 11000) {
      err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
      err.statusCode = 400;
    }
    if (err.name === "JsonWebTokenError") {
      err.message = `Json Web Token is invalid, Try Again`;
      err.statusCode = 400;
    }
    if (err.name === "TokenExpiredError") {
      err.message = `Json Web Token is Expired, Try Again`;
      err.statusCode = 400;
    }
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  };
  
  module.exports = errorMiddleWare;