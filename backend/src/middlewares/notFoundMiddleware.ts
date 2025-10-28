import { Request,Response } from "express";

export const notFoundMiddleware = (req:Request,res:Response)=>{
    
    const message = "Route doesn't exist"

    console.log("NotFoundMiddleware:",message)
    res.status(404).send(message);
    return
};

