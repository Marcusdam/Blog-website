const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const postRouter = require('./router/router.js');
const cookieParser = require("cookie-parser");
const multer = require('multer');
const path = require('path');

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, 'controllers/uploads')));
app.use("/api", postRouter);

module.exports = app

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});


