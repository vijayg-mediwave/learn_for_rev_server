const express = require("express");
const db = require("../models/index");
const argon2 = require("argon2");
const router = express.Router();

const { createToken } = require("../token");

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
    console.log(error);
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await db.students.findOne({
      where: {
        name: req.body.name,
      },
      attributes: ["name", "password", "id"],
    });
    if (!user) {
      return res.status(403).send({
        msg: "kindly pls signup",
      });
    }
    //COMPARE PASSWORD
    const passwordOk = await argon2.verify(user.password, req.body.password);

    if (!passwordOk) {
      return res.status(403).send({
        msg: "user credntials invalid",
      });
    }

    //CFREATE TOKEN
    const token = createToken({
      user: user.id,
    });
    console.log(token);
    return res.send({
      token,
    });
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

module.exports = router;
