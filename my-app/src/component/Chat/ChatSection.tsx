import React, { FC, useEffect, useState } from "react";
import { User } from "../../Redux/Chat/chat.actionType";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { UserInfo } from "../../Redux/Chat/chat.reducer";

interface PropsType {
  currentChat: User | undefined;
  currentUser: UserInfo | null;
}

const ChatSection: FC<PropsType> = ({ currentChat, currentUser }) => {
  const [messages, setMessages] = useState([]);
  // console.log("CHAT", currentChat);
  // console.log("USER", currentUser);
  const handleSendMessage = async (msg: string) => {
    console.log(msg);
    axios.post("http://localhost:5000/chat/addMessage", {
      from: currentUser?._id,
      to: currentChat?._id,
      message: msg,
    });
  };
  async function getMessages(messages) {
    const res = await axios.post("http://localhost:5000/chat/getMessage", {
      from: currentUser?._id,
      to: currentChat?._id,
    });
    setMessages(res.data);
  }
  useEffect(() => {
    getMessages(messages);
  }, [currentChat]);
  console.log(messages);
  return (
    <>
      <div className="w-3/5 m-auto border-2 h-full border-white border-solid">
        <div className="chat-header h-[10%]">
          <div className="user-details flex gap-4 items-center p-2">
            <div className="avatar">
              <img
                className="h-10"
                src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
                alt="Current User"
              />
            </div>
            <div>{currentChat?.username}</div>
          </div>
        </div>
        <Messages msg={messages} />
        <ChatInput sendMsg={handleSendMessage} />
      </div>
    </>
  );
};

export default ChatSection;
