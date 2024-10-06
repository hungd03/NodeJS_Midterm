const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/Auth');

const Course = require('../models/Course');

// @route GET api/courses
// @desc Get courses
// @access private
router.get('/', verifyToken, async (req, res) => {
    try {
        const courses = await Course.find({user: req.userId}).populate('user', ['username']);
        res.json({ sucess: true, courses });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @route POST api/courses
// @desc Create course
// @access private
router.post('/', verifyToken, async (req, res) => {
   
    const { tilte, description, url, status } = req.body;

    if (!tilte)
        return res.status(400).json({ success: false, message: "Title is required" });

    try {

        const newCourse = Course({
            tilte,
            description,
            url: url.startsWith("https://") ? url : `https://${url} `,
            status: status || "TO LEARN",
            user: req.userId,
        });
        await newCourse.save();

        res.json({ success: true, message: "Add course successfully", course: newCourse });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

module.exports = router;