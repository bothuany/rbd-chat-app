const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //To check required fields are entered
  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }
  if (!username) {
    res.status(400);
    throw new Error("Username is required");
  }
  if (!password) {
    res.status(400);
    throw new Error("Password is required");
  }
  //To check password length is greater than 6

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  //To check username and email are available
  const isUsernameInUse = await User.findOne({ username });
  const isEmailInUse = await User.findOne({ email });

  if (isUsernameInUse) {
    res.status(400);
    throw new Error("Entered username already in use");
  }
  if (isEmailInUse) {
    res.status(400);
    throw new Error("Entered email already in use");
  }

  //Create a new user
  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Couldn't create user");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    if (await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid password");
    }
  } else {
    res.status(401);
    throw new Error("Invalid email");
  }
});

//api/user?search=username
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.status(200).send(users);
});
module.exports = { register, login, allUsers };
