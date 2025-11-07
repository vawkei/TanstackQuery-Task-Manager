import { Router } from "express";
import {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task-controller/taskController";

import { authSessionMiddleware } from "../middlewares/authMiddleware";

const taskRouter = Router();

taskRouter.post("/create-task", authSessionMiddleware, createTask);
taskRouter.get("/get-task/:id", authSessionMiddleware, getTask);
taskRouter.get("/get-tasks", authSessionMiddleware, getTasks);
taskRouter.patch("/update-task/:id", authSessionMiddleware, updateTask);
taskRouter.delete("/delete-task/:id", authSessionMiddleware, deleteTask);

export default taskRouter;




// 📒📒=====================This is for Jwt cookies=====================👇👇
// import { Router } from "express";
// import {
//   createTask,
//   getTask,
//   getTasks,
//   updateTask,
//   deleteTask,
// } from "../controllers/task-controller/taskController";
// import authenticationMiddleware from "../middlewares/authMiddleware";

// const taskRouter = Router();

// taskRouter.post("/create-task", authenticationMiddleware, createTask);
// taskRouter.get("/get-task/:id", authenticationMiddleware, getTask);
// taskRouter.get("/get-tasks", authenticationMiddleware, getTasks);
// taskRouter.patch("/update-task/:id", authenticationMiddleware, updateTask);
// taskRouter.delete("/delete-task/:id", authenticationMiddleware, deleteTask);

// export default taskRouter;
// 📒📒=====================This is for Jwt cookies=====================👆👆