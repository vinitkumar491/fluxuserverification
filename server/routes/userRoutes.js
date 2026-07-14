import express from "express";
import {
  createUser,
  getUsers,
  verifyUser,
} from "../controller/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.post("/verify", verifyUser);

export default router;