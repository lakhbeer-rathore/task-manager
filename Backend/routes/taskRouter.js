const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createTasks, deleteTasks, updateTasks, getTasks, getTaskById } = require('../controllers/taskController');
const { validateRegister, validateCreateTask, validateUpdateTask } = require("../middlewares/validationMiddeware");
const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.get("/:id", getTaskById);

router.post("/", authMiddleware, validateCreateTask, createTasks);

router.put("/:id", authMiddleware, validateUpdateTask, updateTasks);

router.delete("/:id", authMiddleware, deleteTasks);

module.exports = router;