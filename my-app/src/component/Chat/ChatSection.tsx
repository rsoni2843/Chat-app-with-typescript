import React, { FC } from "react";
import { User } from "../../Redux/Chat/chat.actionType";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

interface PropsType {
  currentUser: User | null;
}

const ChatSection: FC<PropsType> = ({ currentUser }) => {
  const handleSendMessage = (msg: any) => {};
  return (
    <>
      <div className="w-3/5 m-auto border-2 h-full border-white border-solid">
        <div className="chat-header">
          <div className="user-details flex gap-4 items-center p-6">
            <div className="avatar">
              <img
                className="h-[10%]"
                src={`data:image/svg+xml;base64,${currentUser?.avatarImage}`}
                alt="Current User"
              />
            </div>
            <div>{currentUser?.username}</div>
          </div>
        </div>
        <Messages />
        <ChatInput sendMsg={handleSendMessage} />
        {/* <div className="chat-input"></div> */}
      </div>
    </>
  );
};

export default ChatSection;
