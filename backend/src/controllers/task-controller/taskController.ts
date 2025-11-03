import { Request, Response } from "express";
import Tasks from "../../models/Tasks";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware";

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  console.log("This is the createtask route");

  const { title, description, status, dateDue } = req.body;
  console.log(
    "title:",
    title,
    "des:",
    description,
    "status:",
    status,
    "dateDue:",
    dateDue
  );

  if (!title || !description || !dateDue) {
    res.status(400).json({ msg: "please fill out the inputs except status" });
    return console.log("please fill out the inputs except status");
  }

  const TaskData = {
    title: title,
    description: description,
    status: status,
    dateDue: dateDue,
    createdBy: req.user?.userId,
  };

  try {
    const task = await Tasks.create(TaskData);
    console.log("task:", task);
    if (task) {
      res.status(200).json({ msg: "new task created" });
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("createTaskErrorMsg:", message);
  }

  // res.send("this is the createTask route")
};

export const getTasks = async (req: AuthenticatedRequest, res: Response) => {
  console.log("this is the getTasks route");

  const userId = req.user?.userId;
  const userName = req.user?.userName;
  console.log("userId:", userId);

  try {
    const tasks = await Tasks.find({ createdBy: userId });

    if (tasks.length === 0) {
      res.status(200).json({ msg: "no task saved",nbhts:tasks.length });
      return;
    }
    res
      .status(200)
      .json({ msg: `${userName}'s:`, tasks: tasks, nbhits: tasks?.length });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("getTasksErrorMsg", message);
  }
  // res.send("this is the getTasks route");
};

export const getTask = async (req: Request, res: Response) => {
  console.log("this is the getTask route");

  const { id } = req.params;
  console.log("params:", id);

  try {
    const task = await Tasks.findOne({ _id: id });
    res.status(200).json(task);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("getTasksErrorMsg:", message);
  }

  // res.send("this is the getTask route");
};

export const updateTask = async (req: Request, res: Response) => {
  console.log("this is the updateTask route");

  const taskId = req.params.id;
  console.log("params:", taskId);

  const { title, description, status, dateDue } = req.body;

  const updatedData = {
    title: title,
    description: description,
    status: status,
    dateDue: dateDue,
  };

  try {
    let task = await Tasks.findById(taskId);

    if (!task) {
      console.log(`task with id:${taskId} doesn't exist`);
      res.status(404).json({ msg: `task with id:${taskId} doesn't exist` });
      return;
    }

    task.title = updatedData.title;
    task.description = updatedData.description;
    task.status = updatedData.status;
    task.dateDue = updatedData.dateDue;

    await task?.save();
    res.status(200).json({ msg: "task updated successfully", task });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("updatedTasksErrorMsg:", message);
    return res.status(500).json({ msg: message });
  }

  // res.send("this is the updateTask route");
};

export const deleteTask = async (req: Request, res: Response) => {
  console.log("this is the deleteTask route");

  const taskId = req.params.id;
  console.log("taskId:", taskId);

  try {
    await Tasks.findOneAndDelete({ _id: taskId });
    res
      .status(200)
      // .json({ msg: `task with id ${taskId} deleted successfully.` });
      .json({ msg: `task deleted successfully.` });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("deleteTaskErrorMsg:", message);
  }

  // res.send("this is the deleteTask route");
};
