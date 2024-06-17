const express = require("express");
const app = express();

const basicAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.setHeader("WWW-Authentication", "Basic");
    return res.status(401).send("Authentication required.");
  }
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");
  const user = { username: "admin", password: "password" };
  if (username === user.username && password === user.password) {
    next();
  } else {
    return res.status(401).send("Invalid credentials.");
  }
};

app.use(basicAuth);

app.get("/", (req, res) => {
  res.send("Hello, authenticated user!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
