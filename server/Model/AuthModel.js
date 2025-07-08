const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

const AuthModel = mongoose.model("etrackerauths", AuthSchema);
module.exports = AuthModel;
