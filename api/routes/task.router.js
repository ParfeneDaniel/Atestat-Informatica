import express from "express";
import { authorization } from "../middleware/authorization.js";
import { addTask, deleteTask, getTasks, updateTask } from "../controllers/task.controller.js";
import { taskValidator, updatedTaskValidator } from "../models/checkTask.model.js";
import { commentOwner } from "../middleware/commentOwner.js";

const router = express.Router();

router.use(authorization);
router.get("/", getTasks);
router.post("/add", taskValidator, addTask);
router.put("/:id", updatedTaskValidator, commentOwner, updateTask);
router.delete("/:id", commentOwner, deleteTask);

export default router;