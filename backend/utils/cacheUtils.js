const redisClient = require("../redisClient");

// Hàm tiện ích để xóa cache
const invalidateCourseCache = async (userId) => {
  const cacheKey = `user:${userId}:GET:/api/courses`;

  try {
    await redisClient.del(cacheKey);
    console.log(`Cache invalidated for ${cacheKey}`);
  } catch (error) {
    console.error(`Error invalidating cache for ${cacheKey}:`, error);
  }
};

module.exports = invalidateCourseCache;
