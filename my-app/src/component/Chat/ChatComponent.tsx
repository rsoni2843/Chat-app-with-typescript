import React, { FC, useEffect, useState, useRef } from "react";
import * as io from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import Section1 from "./Section1";
import Section2 from "./Section2";
import { getAllUsers } from "./../../Redux/Chat/chat.action";
import Welcome from "./Welcome";
import { User } from "../../Redux/Chat/chat.actionType";
// https://chat-app-backend-builded-3ni5.vercel.app
const socket = io.connect("https://chat-app-backend-builded-3ni5.vercel.app", {
  transports: ["polling", "websocket"],
  upgrade: false,
  rejectUnauthorized: false,
  secure: true,
  path: "/socket.io",
  // reconnectionDelay: 1000,
  // reconnection: true,
});

const ChatComponent: FC = () => {
  const dispatch = useAppDispatch();
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
    // if (userInfo) {
    //   socket.current = io("https://chat-app-backend-builded-3ni5.vercel.app", {
    //     // protocols: window.location.protocol === "https:" ? "wss" : "ws",
    //     transports: ["polling"],
    //     withCredentials: true,
    //   });
    //   socket.current.emit("add-user", userInfo?._id);
    // }
    if (userInfo) {
      socket.emit("add-user", userInfo?._id);
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
