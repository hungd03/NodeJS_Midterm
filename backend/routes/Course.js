const express = require("express");
const os = require("os");
const router = express.Router();
const verifyToken = require("../middlewares/Auth");
const cacheMiddleware = require("../middlewares/Cache");
const redisClient = require("../redisClient");
const invalidateCourseCache = require("../utils/cacheUtils");

const Course = require("../models/Course");

// @route GET api/courses
// @desc Get courses
// @access private
router.get("/", verifyToken, cacheMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({ user: req.userId }).populate("user", [
      "username",
    ]);

    // Save the response in Redis with serverId from process.env.HOSTNAME
    const cacheData = JSON.stringify({
      success: true,
      courses,
      serverId: process.env.HOSTNAME, // Always use the current server's ID
    });

    await redisClient.set(
      `user:${req.userId}:${req.method}:${req.originalUrl}`,
      cacheData,
      {
        EX: 3600, // Expire the cache after 1 hour
      }
    );

    res.json(JSON.parse(cacheData));
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/courses
// @desc Create course
// @access private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    const newCourse = Course({
      title,
      description,
      url: url ? (url.startsWith("https://") ? url : `https://${url}`) : "",
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newCourse.save();

    // Invalidate the cached list of courses
    await invalidateCourseCache(req.userId);

    res.json({
      success: true,
      message: "Add course successfully",
      course: newCourse,
      hostname: `${os.hostname()}`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/courses/:id
// @desc Update course
// @access private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  try {
    let updatedCourse = {
      title,
      description,
      url: url ? (url.startsWith("https://") ? url : `https://${url}`) : "",
      status: status || "TO LEARN",
    };

    const courseUpdateCondition = { _id: req.params.id, user: req.userId };

    updatedCourse = await Course.findOneAndUpdate(
      courseUpdateCondition,
      updatedCourse,
      { new: true }
    );

    // User not authorized to update course or course not found
    if (!updatedCourse)
      return res.status(401).json({
        success: false,
        message: "Course not found or user not authorized",
      });

    // Invalidate the cached list of courses
    await invalidateCourseCache(req.userId);

    res.json({
      success: true,
      message: "Update course successfully",
      course: updatedCourse,
      serverId: process.env.HOSTNAME,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/courses/:id
// @desc Delete course
// @access private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const courseDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedCourse = await Course.findByIdAndDelete(courseDeleteCondition);

    // User not authorized to delete or course not found
    if (!deletedCourse)
      return res.status(401).json({
        success: false,
        message: "Course not found or user not authorized",
      });

    // Invalidate the cached list of courses
    await invalidateCourseCache(req.userId);

    res.json({
      success: true,
      message: "Delete course successfully",
      course: deletedCourse,
      serverId: process.env.HOSTNAME,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
