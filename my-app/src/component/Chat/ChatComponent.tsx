import React, { FC, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import Section1 from "./Section1";
import Section2 from "./Section2";
import { getAllUsers } from "./../../Redux/Chat/chat.action";
import Welcome from "./Welcome";
import { User } from "../../Redux/Chat/chat.actionType";

// const socket: io.Socket = io.connect("*");

const ChatComponent: FC = () => {
  const dispatch = useAppDispatch();
  const socket = useRef<any>(undefined);
  const { userInfo, allUsers } = useAppSelector((store) => store.chat);
  const [currentChat, setCurrentChat] = useState<User | undefined>(undefined);
  const loggedUser = JSON.parse(localStorage.getItem("logged_user") as string);

  useEffect(() => {
    dispatch(getAllUsers(loggedUser));
  }, [dispatch, loggedUser]);

  function handleChatChange(chat: User) {
    setCurrentChat(chat);
  }
  useEffect(() => {
    if (userInfo) {
      socket.current = io("https://backend-chat-app-ksq5.onrender.com/");
      socket.current.emit("add-user", userInfo?._id);
    }
  }, [userInfo]);
  const responsiveness =
    "max-[480px]:flex-col min-[781px]:p-2 min-[781px]:rounded-lg max-[480px]:w-full max-[480px]:h-screen max-[780px]:w-full max-[780px]:mt-0 max-[780px]:h-[100vh]";
  return (
    <div>
      <div
        className={
          "flex bg-formBg  border-solid items-center mt-4 h-[85vh] w-[85vw] m-auto " +
          responsiveness
        }
      >
        <Section1
          allUsers={allUsers}
          user={userInfo}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome user={userInfo} />
        ) : (
          <Section2
            currentChat={currentChat}
            socket={socket}
            currentUser={userInfo}
          />
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
