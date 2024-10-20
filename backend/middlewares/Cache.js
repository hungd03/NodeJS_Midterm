const redisClient = require("../redisClient"); // Create this to export the Redis client

const cacheMiddleware = async (req, res, next) => {
  try {
    const key = `user:${req.userId}:${req.method}:${req.originalUrl}`; // Use the URL as the key
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      console.log(`Cache HIT for ${key}`);

      // Parse the cached data
      let responseData = JSON.parse(cachedData);

      // Cập nhật serverId với ID của backend hiện tại
      responseData.serverId = process.env.HOSTNAME;

      // Trả về phản hồi với serverId được cập nhật
      return res.status(200).json(responseData);
    }
    console.log(`Cache MISS for ${key}`);
    // Otherwise, continue to the next middleware
    next();
  } catch (error) {
    console.log("Cache error:", error);
    next();
  }
};

module.exports = cacheMiddleware;
