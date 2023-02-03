import express, { Request, Response } from "express";
import UserController from "../controller/user.controller";
const router = express.Router();

router.post("/register", UserController.userRegister);
router.post("/login", UserController.userLogin);
router.get("/getAllUsers/:id", UserController.getAllUsers);
router.get("/getCurrentUser/:id", UserController.getCurrentUser);

router.get("/", (req, res) => res.send("User route working"));

export default router;
