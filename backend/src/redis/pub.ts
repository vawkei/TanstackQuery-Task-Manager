// pub.ts → a Redis client used to publish messages.
import Redis from "ioredis";

export const pubRedis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT) || 6379,
});

// Role: A Redis client used to publish messages to channels (e.g., pubRedis.publish("auth-events", JSON.stringify(...))).
