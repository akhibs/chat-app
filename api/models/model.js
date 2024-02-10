const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  username: String,
  password: String,
});

const model = mongoose.model("user", Schema);

module.exports = model;
