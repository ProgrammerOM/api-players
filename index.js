const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Ratelimit = require("express-rate-limit");
const cors = require("cors");
const { readdirSync } = require("fs");
dotenv.config();

const connectDB = require("./Config/db");
const app = express();

const limiter = Ratelimit({
  windowMs: 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "คำขอมากเกินไป",
  headers: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(limiter);

connectDB();

readdirSync("./routes").map((r) => app.use(require("./routes/" + r)));
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
