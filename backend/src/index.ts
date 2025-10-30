import express from "express";
import cors from "cors";
import "dotenv/config";
import { Request, Response } from "express";
import authRouter from "./routes/auth-route";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import taskRouter from "./routes/task-route";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"

const authRoute = authRouter;
const taskRoute = taskRouter;

const app = express();

// to parse the json body:
app.use(express.json());

const corsOptions = {
  // origin: [
  //   "http://localhost:3000",
  //   "http://192.168.43.52:8081",
  // ],
  // Allow requests from local network👆👆

  origin: "http://localhost:3000", // 👈 TEMPORARY for testing, not secure for production
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "my-custom-header"],
};

app.use(cors(corsOptions));

app.use(cookieParser());

//routes:
app.get("/", (_req: Request, res: Response) => {
  res.send("<h1>This is the index.ts checking in </h1>");
});
// auth route:
app.use("/api/v1/auth", authRoute);
//  task route"
app.use("/api/v1/tasks", taskRoute);

// middlewares:
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = Number(process.env.PORT) || 5000;
// const HOST = "0.0.0.0";

//👇👇============= Connecting locally without a database============👇👇
// const start = async () => {
//   app.listen(port, "localhost", () => {
//     console.log(`server is listening on port: ${port}`);
//   });
// };
// start();
//👆👆============= Connecting locally without a database============👆👆

//👇👇============= Connecting locally to mongodb compass============👇👇
  const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/TASK-MANAGER");
    app.listen(port,"localhost", () => {
      console.log("Connected to local MongoDb successfully");
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
//👆👆============= Connecting locally to mongodb compass============👆👆