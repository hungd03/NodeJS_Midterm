const redis = require("redis");

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://redis:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

redisClient.connect().then(() => {
  console.log("Connected to Redis");
});

module.exports = redisClient;
