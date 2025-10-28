import { Router } from "express";
import {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/task-controller/taskController";

const taskRouter = Router();

taskRouter.post("/create-task",createTask);
taskRouter.get("/get-task",getTask);
taskRouter.get("/get-tasks",getTasks);
taskRouter.patch("/update-task",updateTask);
taskRouter.patch("/delete-task",deleteTask);

export default taskRouter;

