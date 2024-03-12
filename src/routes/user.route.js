import { Router } from "express";
import { logger } from "../middelwares/logger.js";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", logger, async (req, res) => {
  const a = await registerUser(req, res);
  res.send(a);
});
router.post("/login", logger, async (req, res) => {});
router.post("/logout", logger, async (req, res) => {});
router.post("/create/user", logger, async (req, res) => {});
router.patch("/update/user", logger, async (req, res) => {});
router.delete("/delete/user", logger, async (req, res) => {});
router.get("/current/user", logger, async (req, res) => {});

export default router;
