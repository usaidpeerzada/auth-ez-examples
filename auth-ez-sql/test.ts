import fetch from "node-fetch";

let token = "";
async function loginCall() {
  const data = { email: "usaidpeerzada@gmail.com", password: "toin" };
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
loginCall();
protectedRouteCall();
