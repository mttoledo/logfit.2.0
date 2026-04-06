import { Router } from "express";
import {
  handleLogin,
  registerUser,
  getMe,
} from "../controllers/UserController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/auth/login", handleLogin);
router.get("/me", getMe);

export default router;
