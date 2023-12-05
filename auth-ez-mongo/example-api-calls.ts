import fetch from "node-fetch";

let token = "";
async function loginCall() {
  const data = { email: "usaidpeerzada@gmail.com", password: "easyauth" };
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
    email: "usaidpeerzada@gmail.com",
    password: "toin",
    username: "email",
  };
  const response = await fetch("http://localhost:3000/auth/sign-up", {
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
    email: "usaidpeerzada@gmail.com",
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
// loginCall();
// protectedRouteCall();
// signUpCall();
forgotPassword();
// resetPassword();
