import express from "express";
import { authorization } from "../middleware/authorization.js";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";
import {
  taskValidator,
  updatedTaskValidator,
} from "../models/checkTask.model.js";
import { taskOwner } from "../middleware/taskOwner.js";

const router = express.Router();

router.use(authorization);
router.get("/", getTasks);
router.post("/add", taskValidator, addTask);
router.put("/:id", updatedTaskValidator, taskOwner, updateTask);
router.delete("/:id", taskOwner, deleteTask);

export default router;
