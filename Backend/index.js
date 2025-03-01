const { app } = require("./app.js");
const { connectDB } = require("./db/db.js");
const dotenv = require("dotenv");

dotenv.config();

const startServer = async () => {
  try {
    const port = process.env.PORT;

    await connectDB(); // Await the database connection

    app.listen(port, () => {
      console.log(`Server is Running on Port ${port}`);
    });
  } catch (error) {
    console.log("error starting server", error);
    process.exit(1);
  }
};

startServer();