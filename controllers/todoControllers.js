const Todo = require("../schema/todoSchema");

const createToDoHandler = async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      description: req.body.description,
      authorID: req.body.authorID,
      authName: req.body.authName,
      assignedTo: req.body.assignedTo,
      createdAt: req.body.createdAt,
    });

    const savedTodo = await newTodo.save();

    res.send(savedTodo);
  } catch (e) {
    res.send(e);
  }
};

const removeToDoHandler = async (req, res) => {
  try {
    Todo.findByIdAndRemove({ _id: req.params.id }).then((todo) => {
      res.send(todo);
    });
  } catch (e) {
    res.send(e);
  }
};

const updateToDoHandler = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.body.id, {
      description: req.body.description,
      updatedAt: req.body.updatedAt,
    });
    res.send(updatedTodo);
  } catch (e) {
    res.send(e);
  }
};

const getAllTodosHandler = async (req, res) => {
  try {
    const allTodos = await Todo.find();
    res.send(allTodos);
  } catch (e) {
    res.send(e);
  }
};

module.exports = {
  createToDoHandler,
  removeToDoHandler,
  updateToDoHandler,
  getAllTodosHandler,
};
