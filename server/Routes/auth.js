const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthModel = require("../Model/AuthModel");

const AuthRouter = express.Router();

// SignUp Route
AuthRouter.post("/SignUp", async (req, res) => {
  try {
    const { Email, Username, Password } = req.body;

    const existingUser = await AuthModel.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const newUser = new AuthModel({
      Email,
      Username,
      Password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Your account has been created" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// SignIn Route
AuthRouter.post("/SignIn", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const user = await AuthModel.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        Username: user.Username,
        Email: user.Email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = AuthRouter;

