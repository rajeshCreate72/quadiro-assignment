const express = require("express");
const Users = require("../models/users");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await users.findOne({ email: email });

    if (!checkUser) {
      return res.status(404).json("User not found");
    }
    const checkPasswd = await bcrypt.compare(password, checkUser.password);

    if (checkPasswd) {
      res.status(200).json(checkUser.userId);
    } else {
      res.status(401).json("Invalid password or email");
    }
  } catch (error) {
    console.error("Error Logging in: ", error);
    res.status(500).json("Error logging in");
  }
});

module.exports = router;
