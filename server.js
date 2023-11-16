require("module-alias/register");
require("express-async-errors");
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const { environmentConfig } = require("@configs");
const cors = require("cors");
const connectMongoDb = require("@utils/ConnectMongoDB");
const rootRouter = require("./routes");
const jobExpireScheduler = require("./jobExpireScheduler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// app.use("/", jobExpireScheduler);
app.use("/", rootRouter);
connectMongoDb()
  .then(() => {
    app.listen(environmentConfig.PORT, () => {
      console.log(`listening on port ${environmentConfig.PORT}`);
    });
  })
  .catch((err) => {
    console.log("[ERROR] Failed to listen");
    process.exit(1);
  });
