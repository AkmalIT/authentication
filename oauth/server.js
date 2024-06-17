const express = require("express");
const bodyParser = require("body-parser");
const OAuth2Server = require("oauth2-server");
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const oauth = new OAuth2Server({
  model: require("./model"),
  allowBearerTokensInQueryString: true,
});

app.post("/auth", (req, res) => {
  const request = new Request(req);
  const response = new Response(res);

  oauth
    .token(request, response)
    .then((token) => {
      res.json(token);
    })
    .catch((err) => {
      res.status(err.code || 500).json(err);
    });
});

app.get("/secure", (req, res) => {
  const request = new Request(req);
  const response = new Response(res);

  oauth
    .authenticate(request, response)
    .then((token) => {
      res.send("Hello, authenticated user!");
    })
    .catch((err) => {
      res.status(err.code || 500).json(err);
    });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
