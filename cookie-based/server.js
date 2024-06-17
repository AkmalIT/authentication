const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const users = {
  admin: "password",
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    res.cookie("username", username, { httpOnly: true });
    res.send("Logged in!");
  } else {
    res.status(401).send("Invalid credentials.");
  }
});

const authenticateCookie = (req, res, next) => {
  const { username } = req.cookies;
  if (username && users[username]) {
    next();
  } else {
    res.status(401).send("Authentication required.");
  }
};

app.get("/protected", authenticateCookie, (req, res) => {
  res.send("Hello, authenticated user with cookie!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
