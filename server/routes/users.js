const express = require("express");
const router = express.Router();
const db = require("../models/index.js");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  try {
    let user = await db.users.findOne({
      where: { email: req.body.email },
    });
    if (!user) return res.status(404).send("User not found");

    await bcrypt.compare(
      req.body.password,
      user.dataValues.password,
      async (err, _result) => {
        if (err) return res.status(401).send("Bad Credentials");
      }
    );

    let token = jwt.sign({ user }, config.jwt.secret, {
      expiresIn: "2h",
    });

    user.dataValues.token = token;
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/register", async (req, res) => {
  try {
    let hashed = bcrypt.hashSync(req.body.password, saltRounds);
    if (!hashed) return res.status(400);
    var [user] = await db.users.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        email: req.body.email,
        password: hashed,
      },
    });

    if (user) {
      user.token = jwt.sign({ user }, config.jwt.secret, {
        expiresIn: "2h",
      });
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Email already exist.");
    }
  } catch (err) {
    return res.json({
      success: false,
      error: err,
    });
  }
});

module.exports = router;
