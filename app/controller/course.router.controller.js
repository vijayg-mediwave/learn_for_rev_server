const express = require("express");
const db = require("../models");
const router = express.Router();

router.post("/", async (req, res, next) => {
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

module.exports = router;
