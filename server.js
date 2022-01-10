const express = require("express");

const app = express();
const port = 8000;

app.use(express.static("public"));
app.use(express.json());

app.listen(port, () => {
  console.log("hi2");
});
