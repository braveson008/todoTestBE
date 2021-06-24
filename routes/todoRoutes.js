const express = require("express");

const router = express.Router();

const verify = require("../verifyToken");

const {
  createToDoHandler,
  removeToDoHandler,
  updateToDoHandler,
  getAllTodosHandler,
} = require("../controllers/todoControllers");

router.get("/get_todos", verify, getAllTodosHandler);
router.post("/create_todo", createToDoHandler);
router.put("/update_todo", updateToDoHandler);
router.delete("/remove_todo/:id", removeToDoHandler);

module.exports = router;
