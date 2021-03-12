import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";

//read content of env file for utils
dotenv.config();

const app = express();

// connect to MongoDB DataBase
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//server starting route
app.get("/", (req, res) => {
  res.send("server is ready");
});

///////// middelware //////////////

// parse json data in req body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//users middelware
app.use("/api/users", userRouter);

//product middelware
app.use("/api/products", productRouter);

//user router error middelware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
