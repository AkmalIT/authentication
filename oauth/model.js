const users = {
  admin: {
    password: "password",
    id: 1,
  },
};

const clients = {
  client_id: {
    clientSecret: "client_secret",
    grants: ["password"],
  },
};

const tokens = {};

module.exports = {
  getAccessToken: function (token) {
    return tokens[token];
  },

  getClient: function (clientId, clientSecret) {
    const client = clients[clientId];
    if (!client || client.clientSecret !== clientSecret) {
      return null;
    }
    return client;
  },

  saveToken: function (token, client, user) {
    token.client = {
      id: client.clientId,
    };
    token.user = {
      id: user.id,
    };
    tokens[token.accessToken] = token;
    return token;
  },

  getUser: function (username, password) {
    const user = users[username];
    if (!user || user.password !== password) {
      return null;
    }
    return user;
  },
};
