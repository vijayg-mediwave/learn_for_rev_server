const express = require("express");
const db = require("../models");
const router = express.Router();

const { checkForUser } = require("../middlewares/auth.middleware");

router.post("/", checkForUser, async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
    };
    const courseData = await db.courses.create(payload);
    //console.log(courseData);
    res.status(201).send(courseData);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.get("/:courseid", checkForUser, async (req, res, next) => {
  try {
    const courseInfo = await db.courses.findOne({
      where: {
        id: req.params.courseid,
      },
      // include: [
      //   {
      //     model: db.students,
      //     as: "studentInfo",
      //     attributes: ["courseName"],
      //   },
      // ],
    });
    console.log(courseInfo);
    res.status(201).send(courseInfo);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
