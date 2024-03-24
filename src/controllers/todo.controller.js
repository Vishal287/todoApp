import Todo from "../db/Models/todo.model.js";
import { ApiError } from "../utils/error.js";

const createTodo = async (req, res) => {
  try {
    const { title, description, items, isCompeleted } = req.body;
    if (!title || !(description || items.length)) {
      throw new ApiError(404, "Title and description are required!", false);
    }
    const todo = await Todo.create({
      title,
      description,
      items,
      isCompeleted,
      createdBy: req.user._id,
    });

    const createdTodo = await todo.save();

    if (!createdTodo) throw new ApiError(404, "Faild to create todo!", false);

    res.status(201).send(createdTodo);
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error!", false);
  }
};

const updateTodo = async (req, res) => {
  try {
    const _id = req.params._id;
    if (!_id) throw new ApiError(400, "Id not provided!", false);
    const { title, description, items, isCompeleted } = req.body;
    const todo = await Todo.findById({ _id }).lean();

    const updateTodo = {
      ...todo,
      title,
      description,
      items,
      isCompeleted,
    };
    const updatedTodo = await Todo.findByIdAndUpdate({ _id }, updateTodo, {
      new: true,
    });
    res.status(200).send(updatedTodo);
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error!", false);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const _id = req.params._id;
    if (!_id) throw new ApiError(400, "Id not provided!", false);
    const todo = await Todo.findByIdAndDelete({ _id });
    res.status(200).send(todo);
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error!", false);
  }
};

const getTodo = async (req, res) => {
  try {
    const _id = req.params._id;
    if (!_id) throw new ApiError(400, "Id not provided!", false);
    const todo = await Todo.findById({ _id });
    res.status(200).send(todo);
  } catch (error) {
    throw new ApiError(500, "Internal server error!", false);
  }
};

export { createTodo, updateTodo, deleteTodo, getTodo };
