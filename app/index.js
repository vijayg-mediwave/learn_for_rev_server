const express = require("express");
const PORT = 5678;
const app = express();

app.listen(PORT, (err) => {
  if (err) {
    console.log(`app is not running ${PORT} and ${err}`);
  } else {
    console.log(`app is successfully running in ${PORT}`);
  }
});
