const express = require("express");
const env = require("dotenv");
const app = express();
env.config();

app.listen(process.env.PORT || 6789, (err) => {
  if (err) {
    console.log(`app is not running ${process.env.PORT} and ${err}`);
  } else {
    console.log(`app is successfully running in ${process.env.PORT}`);
  }
});
