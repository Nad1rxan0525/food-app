const express = require("express");
const app = express();

const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

// DB Connect
const connectDB = require("./config/db");
connectDB();

// Enviroment
dotenv.config();
const PORT = process.env.PORT || 5000;

// Middellwer
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan("dev"));

// Routes
// REGISTER
app.use("/api/v1/auth", require("./routes/authRouters"))
app.use("/api/v1/user", require("./routes/userRouters"))


app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
