import { Request, Response, NextFunction } from "express";

export const errorHandlerMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("error message from the errorHandlerMiddleware:", error);
  return res
    .status(500)
    .json({ msg: error instanceof Error ? error.message : "unknown error" });
};
