import { Router } from "express";
import {
  login,
  logout,
  register,
  registeradmin,
  verifyToken,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/registeradmin", validateSchema(registerSchema), registeradmin);
router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);

export default router;
