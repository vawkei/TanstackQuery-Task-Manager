import express from "express";
import cors from "cors";
import "dotenv/config";
import { Request, Response } from "express";
import authRouter from "./routes/auth-route";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import taskRouter from "./routes/task-route";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectRedis from "connect-redis";
import { redisClient } from "./redis/redisClient";

const authRoute = authRouter;
const taskRoute = taskRouter;

const app = express();
const RedisStore = connectRedis(session);

const corsOptions = {
  origin: "http://localhost:3000", // 👈 TEMPORARY for testing, not secure for production
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "my-custom-header"],
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(
  session({
    store: new RedisStore({ client: redisClient }), //stores session in Redis
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, //one day
    },
  })
);

// to parse the json body:
app.use(express.json());

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

console.log(`Worker ${process.pid} connected to Redis`);

const port = Number(process.env.PORT) || 5000;

const startWorker = async () => {
  try {
    //👇 MongoDB and Node.js are running outside Docker
    // 👇(both on the laptop)

    // await mongoose.connect("mongodb://localhost:27017/TASK-MANAGER");

    //👇database is running locally on my machine and Node app is running inside Docker
    // await mongoose.connect("mongodb://host.docker.internal:27017/TASK-MANAGER");

    //👇 connecting to mongodb running inside adocker container
    await mongoose.connect("mongodb://mongodb:27017/TASK-MANAGER");
    console.log(`Worker ${process.pid} connected to DB`);

    app.listen(port, () => {
      console.log(`Worker ${process.pid} listening on port ${port}`);
    });
  } catch (error) {
    console.log(`Worker ${process.pid} failed to connect:`, error);
  }
};
startWorker();

// export default app; //👈👈👈👈🛑🛑🛑 Export the app here 🛑🛑🛑👈👈👈👈
