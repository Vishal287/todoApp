import express from "express";
import DB from "./db/db.js";
import UserRouter from "./routes/user.route.js";
import dotenv from "dotenv";
import { logger } from "./middelwares/logger.js";

dotenv.config();

const app = express();
const Port = process.env.PORT || 3000;

app.use(
  express.json({
    limit: "6kb",
  }),
);
app.use(logger);

app.use("/api/users/", UserRouter);

DB()
  .then(() => {
    app.listen(Port, () => {
      console.log("Server is started successfully!!!! ");
    });
  })
  .catch((error) => {
    console.log(error);
  });
