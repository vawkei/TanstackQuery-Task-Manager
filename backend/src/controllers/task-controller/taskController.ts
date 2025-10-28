import { Request,Response } from "express"

export const createTask = (req:Request,res:Response)=>{
    res.send("this is the createTask route")
};

export const getTasks =async (req:Request,res:Response)=>{
    res.send("this is the getTasks route")
};

export const getTask = async(req:Request,res:Response)=>{
    res.send("this is the getTask route")
};

export const updateTask = async(req:Request,res:Response)=>{
    res.send("this is the updateTask route")
};

export const deleteTask = async(req:Request,res:Response)=>{
    res.send("this is the updateTask route")
}