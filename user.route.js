import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { Authentication } from "../middelwares/auth.js";

const router = Router();

router.route("/register").post(async (req, res) => {
  return await registerUser(req, res);
});

router.route("/login").post(async (req, res) => {
  return await loginUser(req, res);
});

router.route("/logout").post(Authentication, async (req, res) => {});

router.route("/current/user").get(Authentication, async (req, res) => {
  res.status(200).send(req.user);
});

export default router;
