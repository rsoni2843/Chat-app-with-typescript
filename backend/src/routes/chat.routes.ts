import express, { Request, Response } from "express";
import ChatController from "../controller/chat.controller";
const router = express.Router();

router.post("/addMessage", ChatController.addMessage);
router.post("/getMessage", ChatController.getMessage);

router.get("/", (req, res) => res.send("Chat route working"));

export default router;
