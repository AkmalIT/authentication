const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const SECRET_KEY = "your_secret_key";

app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = { username: "admin", password: "password" };

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials.");
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

app.get("/protected", authenticateToken, (req, res) => {
  res.send("Hello, authenticated user with token!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
