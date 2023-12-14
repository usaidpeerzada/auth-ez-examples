import fetch from "node-fetch";

let token = "";
async function loginCall() {
  const data = { email: "test@test.com", password: "easyauth" };
  const response = await fetch("http://localhost:3000/auth/login-with-email", {
    method: "post",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const body = await response.json();
  token = body.token;
  console.log(body);
}
console.log(token);
async function protectedRouteCall() {
  const response = await fetch("http://localhost:3000/auth/protected-route", {
    method: "GET",
    headers: {
      //   "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const body = await response.text();
  console.log(body);
}

async function signUpCall() {
  const data = {
    email: "test@test.com",
    password: "test123",
    username: "email",
  };
  const response = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();
  console.log("signUpCall() ", body);
}

async function forgotPassword() {
  const data = {
    email: "test@test.com",
  };
  const response = await fetch("http://localhost:3000/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();
  console.log("forgotPassword() ", body);
}

async function resetPassword() {
  const data = {
    newPassword: "easyauth",
  };
  const response = await fetch(
    "http://localhost:3000/auth/reset-password?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDE3NjY0OTUsImV4cCI6MTcwMTc3MDA5NX0.2eKLbxk1QWBz7BcvtqQGQv1b-9opo-MW9pWPQYARqZ8",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const body = await response.json();
  console.log("resetPassword() ", body);
}
loginCall();
// protectedRouteCall();
// signUpCall();
// forgotPassword();
// resetPassword();
