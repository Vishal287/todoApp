import express from "express";
import { logger } from "./middelwares/logger.js";
import { ApiResonse } from "./utils/error.js";
// import DB from "./db/db.js";
import UserRouter from "./routes/user.route.js";

const app = express();
const Port = process.env.PORT || 3000;

app.use(
  express.json({
    limit: "6kb",
  }),
);

app.use("/api/users/", UserRouter);

// DB()
//   .then(() => {
//     app.listen(Port, () => {
//       console.log("Server is started successfully!!!! ");
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

app.listen(Port, () => {
  console.log("Server is started successfully!!!! ");
});
