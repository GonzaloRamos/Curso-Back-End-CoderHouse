const options = {
  client: "sqlite3",
  connection: {
    filename: "./database/chat.sqlite3",
  },
  useNullAsDefault: true,
};

module.exports = options;
