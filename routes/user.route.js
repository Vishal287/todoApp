import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { Authentication } from "../middelwares/auth.js";

const router = Router();

router.post("/register", async (req, res) => {
  return await registerUser(req, res);
});
router.post("/login", async (req, res) => {
  return await loginUser(req, res);
});
router.post("/logout", Authentication, async (req, res) => {});
router.get("/current/user", Authentication, async (req, res) => {});

export default router;
