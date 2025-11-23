// starting with cluster: If cluster.ts is in the root (backend/):  npx ts-node cluster.ts
//else: 
//npx ts-node src/cluster.ts
import cluster from "cluster";
import os from "os";
// import app from "./index";
import mongoose from "mongoose";

const port = Number(process.env.PORT) || 5000;
let app : any;

if (cluster.isPrimary) {
  const numOfCpu = os.cpus().length;

  console.log(`Master ${process.pid} is running...`);
  console.log(`Spawning ${numOfCpu} workers...`);

  for (let i = 0; i < numOfCpu; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died, restarting...`);
    cluster.fork();
  });
} else {

  app = require("../src/index").default; //the only reason require() was suggested is because static import at the top always executes, which causes the master process to load index.ts and connect to Redis.

  const startWorker  = async()=>{
    try{
      await mongoose.connect("mongodb://localhost:27017/TASK-MANAGER");
      console.log(`Worker ${process.pid} connected to DB`);

      app.listen(port,()=>{
        console.log(`Worker ${process.pid} listening on port ${port}`);
      })
    }catch(error){
        console.log(`Worker ${process.pid} failed to connect:`, error);
    }
  };
  startWorker()
};
