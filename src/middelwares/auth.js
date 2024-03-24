import jwt from "jsonwebtoken";
import { ApiError } from "../utils/error.js";
import { User } from "../db/Models/user.model.js";

export async function Authentication(req, res, next) {
  try {
    let token = req.headers?.authorization;
    if (!token) res.status(401).send("Unauthorized");
    token = token.replace("Bearer ", "");
    const decode = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
    const isExpire =
      new Date(decode.exp).getMilliseconds() < new Date().getMilliseconds();
    if (!isExpire) res.status(401).send("Unauthorized");
    const user = await User.findById(decode._id);
    if (!user) res.status(401).send("User not found!");
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized", false, error);
  }
}
