const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema({
  User_ID:{
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  TransactionType: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
 
});

const ETmodel = mongoose.model("expenses", ExpenseSchema);

module.exports = ETmodel;
