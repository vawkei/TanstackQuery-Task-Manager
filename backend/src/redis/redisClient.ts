import Redis from "ioredis";

export const redisClient = new Redis({
    host:process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT) || 6379,
    // port:process.env.REDIS_PORT,
     retryStrategy:(times:number)=>Math.min(times*50,2000)
});

redisClient.on("connect",()=>console.log("connected to redis..."));
redisClient.on("error",(err)=>console.log("Redis error:",err))