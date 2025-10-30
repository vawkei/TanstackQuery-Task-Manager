import { Request, Response } from "express";
import Tasks from "../../models/Tasks";

export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, dateDue } = req.body;

  if (!title || !description || !dateDue) {
    res.status(400).json({ msg: "please fill out the inputs except status" });
    return console.log("please fill out the inputs except status");
  }

  const TaskData = {
    title: title,
    description: description,
    status: status,
    dateDue: dateDue,
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

export const getTasks = async (req: Request, res: Response) => {
  
  
  // res.send("this is the getTasks route");
};

export const getTask = async (req: Request, res: Response) => {
  res.send("this is the getTask route");
};

export const updateTask = async (req: Request, res: Response) => {
  res.send("this is the updateTask route");
};

export const deleteTask = async (req: Request, res: Response) => {
  res.send("this is the deleteTask route");
};
