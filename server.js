const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Sutting Down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");

// const DB = .replace("<PASSWORD>", process.env.DB_PASS);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful"));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Sutting Down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
