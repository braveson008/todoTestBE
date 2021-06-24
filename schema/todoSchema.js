const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: String,
  description: String,
  authorID: String,
  authName: String,
  createdAt: String,
  updatedAt: String,
  assignedTo: Array,
});

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
