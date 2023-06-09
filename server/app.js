const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors');

const usersRouter = require("./routes/users");
const productRouter = require("./routes/product");
const variationRouter = require("./routes/variation");

const app = express();

app.use(
    cors({
      origin: "*"
    })
  )

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/product", productRouter);
app.use("/variation", variationRouter);

module.exports = app;
