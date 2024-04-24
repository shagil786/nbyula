const express = require("express");
const router = express.Router();
const userSchema = require("../schema/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await userSchema.findOne({ username: username });

    if (!user || user.length === 0) {
      res.status(400).send({
        message: "User not found!",
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send({ message: "Incorrect password!" });
    }

    const secret = process.env.secret;
    const token = jwt.sign(
      {
        userID: user._id,
      },
      secret,
      { expiresIn: "1d" },
    );

    res.status(200).send({
      message: "User found",
      data: {
        username: username,
        password: user.password,
        token: token,
        secret: secret,
        isAdmin: user.isAdmin,
        id: user._id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
