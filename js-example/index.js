const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const { Resend } = require("resend");
const {
  CreateMongoAuthController,
  CreateSqlAuthController,
} = require("auth-ez");
// const { User } = require("./user.model.js");
const { Sequelize } = require("sequelize");
const { User } = require("./user.sqlmodel.js");
const fetch = require("node-fetch");
const { Headers } = require("node-fetch");
dotenv.config();

// const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/test";
// mongoose.connect(mongoUrl);
const sequelize = new Sequelize(
  "postgres://usaid:yourpassword@localhost:5432/testdb"
); // Example for postgres

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
const app = express();

const resend = new Resend(process.env.RESEND_API_KEY, Headers, fetch);
const config = {
  User,
  emailOptions: {
    enableEmail: true,
    emailType: "resend",
    emailSdk: resend,
  },
};
// const authController = new CreateMongoAuthController(config).getRouter();
const authController = new CreateSqlAuthController(config).getRouter();
app.use("/api", authController);

app.listen(3000, () => console.log("listening!!!"));
