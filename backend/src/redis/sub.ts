// sub.ts → a Redis client used to subscribe to channels (and receive messages).
import Redis from "ioredis";

export const subRedis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT) || 6379,
});

// Role: This file creates a Redis client whose only job is to subscribe to channels and receive messages published by other code.

// Why separate? A Redis client that is subscribed cannot perform regular Redis commands (it becomes blocked waiting for messages). So you create a dedicated sub client.
