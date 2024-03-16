import { validationResult } from "express-validator";
import Attribute from "../models/attribute.model.js";
import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Attribute.findOne({ user: userId }).populate("tasks");
    res.status(201).json(tasks.tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};

export const addTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: "The task doesn't pass all rules" });
    }
    const { title, content, importance, status } = req.body;
    const id = req.user.id;
    const userAttribute = await Attribute.findOne({ user: id });
    const task = new Task({ title, content, importance, status });
    userAttribute.tasks.push(task._id);
    await Promise.all([task.save(), userAttribute.save()]);
    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: "The task doesn't pass all rules" });
    }
    const id = req.params.id;
    await Task.findByIdAndUpdate(id, req.body);
    res.status(201).json({ message: "Task updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    await Promise.all([
      Attribute.updateOne({ user: userId }, { $pull: { tasks: id } }),
      Task.findByIdAndDelete(id),
    ]);
    res.status(201).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};
