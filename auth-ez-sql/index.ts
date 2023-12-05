import express from "express";
import { User } from "./user.model.ts";
import { Config } from "./types.ts";
import { Resend } from "resend";
import fetch, { Headers } from "node-fetch";
import { Sequelize } from "sequelize";
import { CreateSqlAuthController, Types } from "auth-ez";
// import SqlAuthController from "./sqlAuthController.ts";
const resend = new Resend(process.env.RESEND_API_KEY, Headers, fetch);
const app = express();
const port = 3000;

const sequelize = new Sequelize(
  "postgres://usaid:yourpassword@localhost:5432/testdb"
); // Example for postgres

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
const config: Config = {
  // Send user model to the auth-ez controller:
  User,
  enableLogs: true,
  // you can pass your own password hashing function, by default we use bycript.hash with saltRounds = 10
  //   hashPassword: () => {},
  // options to send to jwt:
  //   tokenOptions: {
  //     expiresIn: "2h",
  //   },
  //   we have default route  names as specified in documentation but you can override them with as per your need,
  //    just add them as specified below:
  //   routeNames: {
  // loginWithEmailRoute: "/test-post-requests",
  // loginWithUsernameRoute: "/my-user-route",
  // signupRoute: "/sign-up",
  // forgotPasswordRoute,
  // resetPasswordRoute,
  // signupRoute,
  // logoutRoute,
  //   },
  // email options for sending verification email and reset password link - this is optional but if enabled all other params inside are required.
  emailOptions: {
    enableEmail: true,
    emailType: "resend",
    emailSdk: resend,
    forgotPasswordSubject: "",
    forgotPasswordBody: "",
    verificationMailSubject: "Sending custom subejct from config",
    verificationMailBody: `here is the body bro`,
    // emailService: new EmailService(this),
  },
};
const sqlAuthController = new CreateSqlAuthController(config);
app.use("/auth", sqlAuthController.getRouter());
app.get("/auth/protected-route", (req, res) => {
  console.log("HEADERS -> ", req.headers);
  res.send("Protected route is working");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
