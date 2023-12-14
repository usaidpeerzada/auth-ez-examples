import fetch from "node-fetch";

let token = "";
async function loginEmailCall() {
  const data = { email: "test@test.com", password: "test123" };
  const response = await fetch("http://localhost:3000/auth/login-with-email", {
    method: "post",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const body = await response.json();
  token = body.token;
  console.log(body);
}

async function loginUsernameCall() {
  const data = { username: "tester", password: "test123" };
  const response = await fetch(
    "http://localhost:3000/auth/login-with-username",
    {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }
  );
  const body = await response.json();
  token = body.token;
  console.log(body);
}

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
    username: "tester",
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
    "http://localhost:3000/auth/reset-password?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTZlZWIyZmZiOWQzZjdlOWEwNTAyOWYiLCJpYXQiOjE3MDE3Njg0MTQsImV4cCI6MTcwMTc3MjAxNH0.vLaEVYBv2VMMdK09FPMHJ9g0uBPNGeXsFyfHtBhYXEo",
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
// loginEmailCall();
loginUsernameCall();
// protectedRouteCall();
// signUpCall();
// forgotPassword();
// resetPassword();
