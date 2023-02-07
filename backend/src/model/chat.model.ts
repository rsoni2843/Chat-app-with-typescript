import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    message: { text: { type: String, required: true } },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const ChatModel = mongoose.model("Chat", chatSchema);

export default ChatModel;
