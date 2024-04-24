const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../schema/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const username = req.body.username,
    password = req.body.password,
    isAdmin = req.body.isAdmin;

  try {
    const user = await userSchema.find({ username: username });
    if (user.length > 0) {
      res.status(401).send({
        message: "user alreay existed",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const addUser = await userSchema({
      username: username,
      password: hashedPassword,
      isAdmin: isAdmin,
    });

    await addUser.save();

    const secret = process.env.secret;
    const token = jwt.sign(
      {
        userID: addUser._id,
      },
      secret,
      { expiresIn: "1d" },
    );

    res.status(200).send({
      message: "new Job Listing added",
      data: {
        username: username,
        password: password,
        isAdmin: isAdmin,
        secret: secret,
        token: token,
        id: addUser._id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
