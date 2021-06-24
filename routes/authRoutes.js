const express = require("express");

const router = express.Router();

const {
  registerHandler,
  defaultLoginHandler,
  getAllUsersHandler,
} = require("../controllers/authControllers");

router.get("/get_users", getAllUsersHandler);
router.post("/register", registerHandler);
router.post("/default_login", defaultLoginHandler);

module.exports = router;
