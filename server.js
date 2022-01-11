import express from "express";
import cors from "cors";
import userRouter from "./router/userRouter.js";

const app = express();
const port = 8000;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

app.listen(port, () => {
  console.log("hi2");
});
