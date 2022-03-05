const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const { generateJWT } = require("../helpers/jwt");

// Create user
const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Email exists",
      });
    }
    user = new User(req.body);
    // encrypt pass
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please talk with the administrator",
    });
  }
};

// Login
const login = async (req, res = response) => {
  const { password, email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User doesn't exist",
      });
    }
    // confirm password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Wrong password",
      });
    }
    // generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact with your admin",
    });
  }
};

// Renew token
const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  // generate new JWT and return in this request
  const token = await generateJWT(uid, name);

  return res.json({
    ok: true,
    token,
  });
};

module.exports = { createUser, login, renewToken };
