const express = require("express");
const env = require("dotenv");
const db = require("./models/index");

const studentRouter = require("./controller/student.router.controller");
const courseRouter = require("./controller/course.router.controller");

const app = express();
app.use(express.json());
env.config();
//CRUD
app.use("/api/students", studentRouter);
app.use("/api/courses", courseRouter);

app.use((req, res, next) => {
  return res.status(404).send({
    msg: "Route Not Found",
  });
});
// Error Handling
app.use((err, req, res, next) => {
  res.status(500).send({
    msg: "Inertnal Server Error",
  });
});

//DB CONNECTION
const dbConnect = async () => {
  try {
    await db.sequelize.sync(
      { force: false },
      console.log({
        message: "db connected successfully",
      })
    );
  } catch (error) {
    console.log(error);
  }
};
dbConnect();

//PORT LISTEN
app.listen(process.env.PORT || 6789, (err) => {
  if (err) {
    console.log(`app is not running ${process.env.PORT} and ${err}`);
  } else {
    console.log(`app is successfully running in ${process.env.PORT}`);
  }
});
