const express = require('express');
const router = express.Router();

const Course = require('../models/Course');

// @route POST api/courses
// @desc Create course
// @access private
router.post('/', async (req, res) => {
   
    const { tilte, description, url, status } = req.body;

    if (!tilte)
        return res.status(400).json({ success: false, message: "Title is required" });

    try {

        const newCourse = Course({
            tilte,
            description,
            url: url.startsWith("https://") ? url : `https://${url} `,
            status: status || "TO LEARN",
            user: "67024aae63261db40e08e8c4",
        });
        await newCourse.save();

        res.json({ success: true, message: "Add course successfully", course: newCourse });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

module.exports = router;