const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../schema/userSchema");

const registerHandler = async (req, res) => {
  try {
    const usernameTaken = await User.findOne({ username: req.body.username });
    if (usernameTaken)
      return res.status(400).send("Username is already in use");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      password: hashPassword,
    });

    try {
      const savedUser = await newUser.save();
      res.send(savedUser);
    } catch (e) {
      res.status(404).send(e);
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

const defaultLoginHandler = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Invalid username");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");

    const token = jwt.sign({ user }, "secretKey", {
      expiresIn: "24h",
    });

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

const getAllUsersHandler = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (e) {
    res.send(e);
  }
};

module.exports = {
  registerHandler,
  defaultLoginHandler,
  getAllUsersHandler,
};
