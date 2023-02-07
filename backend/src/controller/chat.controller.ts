import { Request, Response } from "express";
import ChatModel from "../model/chat.model";

class ChatController {
  static addMessage = async (req: Request, res: Response) => {
    try {
      const { from, to, message } = req.body;
      const data = await ChatModel.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });
      //   console.log(data);
      if (data) {
        return res.status(201).send({ message: "Message added successfully" });
      } else {
        return res
          .status(402)
          .send({ message: "Failed to add message to the database" });
      }
    } catch (err) {
      console.log(err);
      res.status(401).send({ message: "Some error occured" });
    }
  };

  static getMessage = async (req: Request, res: Response) => {
    try {
      const { from, to } = req.body;
      const messages = await ChatModel.find({
        users: { $all: [from, to] },
      }).sort({ updatedAt: 1 });
      const projectedMessages = messages.map((el: any) => {
        return {
          fromSelf: el?.sender.toString() === from,
          message: el?.message.text,
        };
      });
      return res.status(201).send(projectedMessages);
    } catch (err) {
      res.status(401).send({ message: "Some error occured" });
    }
  };
}

export default ChatController;
