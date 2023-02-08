const express = require("express");
const db = require("../models/index");
const argon2 = require("argon2");
const router = express.Router();

const { createToken } = require("../token");
const { checkForUser } = require("../middlewares/auth.middleware");
router.post("/signup", async (req, res, next) => {
  try {
    const userNameTaken = await db.students.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (userNameTaken) {
      return res.status(201).send({
        msg: "username already exist",
      });
    }
    //PASWORD HASH
    const passwordHash = await argon2.hash(req.body.password);
    //PASSWORD VERIFICATION
    const passwordSame = await argon2.verify(passwordHash, req.body.password);
    const userpayload = {
      name: req.body.name,
      password: passwordHash,
      age: req.body.age,
    };
    const newUser = await db.students.create(userpayload);
    return res.status(201).send({
      id: newUser.id,
    });
  } catch (error) {
    //console.log(error);
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const student = await db.students.findOne({
      where: {
        name: req.body.name,
      },
      attributes: ["name", "password", "id"],
    });
    if (!student) {
      return res.status(403).send({
        msg: "kindly pls signup",
      });
    }
    //COMPARE PASSWORD
    const passwordOk = await argon2.verify(student.password, req.body.password);

    if (!passwordOk) {
      return res.status(403).send({
        msg: "user credntials invalid",
      });
    }

    //CFREATE TOKEN
    const token = createToken({
      student: student.id,
    });
    //console.log(token);
    return res.status(201).send({
      token,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.get("/info", checkForUser, async (req, res, next) => {
  try {
    //console.log(res.locals.student);
    const sutdentData = await db.students.findOne({
      where: {
        id: res.locals.student,
      },
      attributes: ["id", "name", "age", "createdAt", "course"],
      include: [
        {
          model: db.courses,
          as: "courseInfo",
          attributes: ["id", "courseName","duration","language"],
        },
      ],
    });
    console.log(sutdentData);
    const json = sutdentData.toJSON();
    return res.status(200).send(json);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const sutdentData = await db.students.findAll({});
    console.log(sutdentData);
    res.status(200).send(sutdentData);
  } catch (error) {
    //console.log(error);
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await db.students.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      msg: "one item deleted",
    });
  } catch (error) {
    //console.log(error);
    return next(error);
  }
});

router.put("/:studentid", async (req, res, next) => {
  try {
    const student = await db.students.findOne({
      where: {
        id: req.params.studentid,
      },
    });

    if (!student) {
      return res.status(404).send({
        msg: "student not found",
      });
    }

    if (req.body.name) {
      student.name = req.body.name;
    }
    if (req.body.course) {
      student.course = req.body.course;
    }
    if (req.body.age) {
      student.age = req.body.age;
    }

    await student.save();
    return res.status(200).send(student);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
