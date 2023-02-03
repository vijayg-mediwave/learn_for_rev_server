const express = require("express");
const env = require("dotenv");
const db = require("./models/index");

const studentRouter = require("./controller/student.router.controller");

const app = express();
app.use(express.json());
env.config();

app.use("/api/students", studentRouter);

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
