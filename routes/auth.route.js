import express from "express";
import authenticateUser from "../middleware/authentication.js";
import demoUser from "../middleware/demo-user.js";

import { register, login, updateUser } from "../controllers/auth.controller.js";

import rateLimiter from "express-rate-limit";

const router = express.Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 10,
  message: {
    msg: "Too many requests from this IP, please try again after 15 minutes",
  },
});

router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, login);
router.patch("/updateUser", authenticateUser, demoUser, updateUser);

export default router;
