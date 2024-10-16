const express = require("express");
const os = require("os");
const router = express.Router();
const verifyToken = require("../middlewares/Auth");

const Course = require("../models/Course");

// @route GET api/courses
// @desc Get courses
// @access private
router.get("/", verifyToken, async (req, res) => {
  try {
    const courses = await Course.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    //res.json({ success: true, courses });
    res.json({ success: true, courses, hostname: `${os.hostname()}` });
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

    res.json({
      success: true,
      message: "Add course successfully",
      course: newCourse,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/courses
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

    // User not authorised to update course or course not found
    if (!updatedCourse)
      return res.status(401).json({
        success: false,
        message: "Course not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Update course successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/courses
// @desc Delete course
// @access private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const courseDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedCourse = await Course.findByIdAndDelete(courseDeleteCondition);

    // User not authorised to delete or course not found
    if (!deletedCourse)
      return res.status(401).json({
        success: false,
        message: "Course not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Delete course successfully",
      course: deletedCourse,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
