import React, { FC, useEffect, useState } from "react";
import * as io from "socket.io-client";
import { User } from "../../Redux/Chat/chat.actionType";
import ChatInput from "./Input";
import Messages from "./Messages";
import axios from "axios";
import { UserInfo } from "../../Redux/Chat/chat.reducer";

interface PropsType {
  currentChat: User | undefined;
  currentUser: UserInfo | null;
  socket: any;
}

export interface MessagesType {
  fromSelf: boolean;
  message: string;
}

const Section2: FC<PropsType> = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);

  // console.log("CHAT", currentChat);
  // console.log("USER", currentUser);
  const handleSendMessage = async (msg: string) => {
    socket.current.emit("send-msg", {
      to: currentChat?._id,
      from: currentUser?._id,
      msg,
    });
    await axios.post(
      "https://chat-app-backend-builded.vercel.app/chat/addMessage",
      {
        from: currentUser?._id,
        to: currentChat?._id,
        message: msg,
      }
    );
    const msgs: any = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket, messages]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  async function getMessage() {
    const res = await axios.post(
      "https://backend-chat-app-sf48.vercel.app/chat/getMessage",
      {
        from: currentUser?._id,
        to: currentChat?._id,
      }
    );
    setMessages(res?.data);
  }

  useEffect(() => {
    getMessage();
  }, [currentChat]);
  const responsiveness =
    "max-[780px]:w-[50%]  max-[480px]:w-[100vw] max-[480px]:h-[50vh]";
  return (
    <>
      <div className={"w-3/5  m-auto h-full " + responsiveness}>
        <div className="chat-header  max-[480px]:hidden h-[10%]">
          <div className="user-details  flex gap-4 items-center p-2">
            <div className="z-100 avatar">
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

export default Section2;
