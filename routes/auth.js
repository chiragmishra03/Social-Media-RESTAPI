const router = require("express").Router();
const { Console } = require("console");
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
//REGISTER
router.post("/register", async (req, res) => {
  try {
    const user_check = await User.findOne({
      email: req.body.email,
    });
    if (user_check) {
      res.status(400).json("User already exists");
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedpassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});
//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    !user && res.status(404).json("User not found");
    const validpass = await bcrypt.compare(req.body.password, user.password);
    !validpass && res.status(400).json("Wrong password");
    res.status(200).json(user);
  } catch (err) {
    Console.log(err);
  }
});
module.exports = router;
