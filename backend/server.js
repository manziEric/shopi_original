import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

//read content of env file for utils
dotenv.config();

const app = express();

// connect to MongoDB DataBase
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//paypal route. get info from env file
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

///////// middelware //////////////

// parse json data in req body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//users
app.use("/api/users", userRouter);

//upload image
app.use("/api/uploads", uploadRouter);

//path.resolve return current folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//Serve react files inside build folder in frontend
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

//products route
app.use("/api/products", productRouter);

//user router error
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//order
app.use("/api/orders", orderRouter);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
