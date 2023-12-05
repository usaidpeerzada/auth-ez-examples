import express from "express";
import mongoose from "mongoose";
import { User } from "./user.model.ts";
import { Config } from "./types.ts";
import { Resend } from "resend";
import fetch, { Headers } from "node-fetch";
import { CreateMongoAuthController, EmailService } from "auth-ez";
const resend = new Resend(process.env.RESEND_API_KEY, Headers, fetch);
const app = express();
const port = 3000;
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/test";

mongoose.connect(mongoUrl);
const config: Config = {
  // Send user model to the auth-ez controller:
  User: User,
  enableLogs: true,
  // you can pass your own password hashing function, by default we use bycript.hash with saltRounds = 10
  //   hashPassword: () => {},
  // options to send to jwt:
  //   tokenOptions: {
  //     expiresIn: "2h",
  //   },
  //   we have default route  names as specified in documentation but you can override them with as per your need,
  //    just add them as specified below:
  routeNames: {
    // loginWithEmailRoute: "/test-post-requests",
    loginWithUsernameRoute: "/my-user-route",
    signupRoute: "/sign-up",
    // forgotPasswordRoute,
    // resetPasswordRoute,
    // signupRoute,
    // logoutRoute,
  },
  // email options for sending verification email and reset password link - this is optional but if enabled all other params inside are required.
  emailOptions: {
    enableEmail: true,
    emailType: "",
    emailSdk: resend,
    forgotPasswordSubject: "",
    forgotPasswordBody: "",
    verificationMailSubject: "Sending custom subejct from config",
    verificationMailBody: `here is the body bro ${mongoUrl}`,
    // emailService: new EmailService(this),
  },
};

const authController = new CreateMongoAuthController(config);
app.use("/auth", authController.getRouter());
app.get("/auth/protected-route", (req, res) => {
  console.log("HEADERS -> ", req.headers);
  res.send("Protected route is working");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
