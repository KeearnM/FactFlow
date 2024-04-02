require("dotenv").config();

const express = require("express");
const connectDB = require("./src/db/db");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const smartCollections = require("./src/routers/smartCollections");
const auth = require("./src/routers/auth");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB();

const app = express();
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", smartCollections);
app.use("/auth", auth);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
