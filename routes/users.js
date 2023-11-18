const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/usermodel");
const mongoose = require("mongoose");

//UPDATE USER
router.put("/api/user/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedpassword;
      } catch (error) {
        console.log(error);
        return res.status(500).json("Cannot Update Account ! Please try later");
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(201).json("User updated successfully");
    } catch (err) {
      console.log(err);
      return res.status(500).json("Cannot Update Account ! Please try later");
    }
  } else {
    return res.status(401).json("You can only update your account");
  }
});

//DELETE USER
router.delete("/api/user/delete/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(201).json("deleted successfully");
    } catch (err) {
      return res.status(401).json("cannot delete the user");
    }
  } else {
    return res.status(401).json("You can only delete your id");
  }
});

//GET A USER
router.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { __v, createdAt, email, password, updatedAt, ...others } = user._doc;
    res.status(201).json(others);
  } catch (err) {
    return res.status(404).json("Cannot retrieve this user");
  }
});

// FOLLOW A USER

module.exports = router;
