import { Router } from "express";
import { Authentication } from "../middelwares/auth.js";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
  getUserTodos,
} from "../controllers/todo.controller.js";

const router = Router();

router.route("/create/todo").post(Authentication, createTodo);
router.route("/update/todo/:_id").post(Authentication, updateTodo);
router.route("/delete/todo/:_id").delete(Authentication, deleteTodo);
router.route("/todo/:_id").get(Authentication, getTodo);
router.route("/").get(Authentication, getUserTodos);

export default router;
