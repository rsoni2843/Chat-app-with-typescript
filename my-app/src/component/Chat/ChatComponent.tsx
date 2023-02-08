import React, { FC, useEffect, useState } from "react";
import * as io from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import Section1 from "./Section1";
import Section2 from "./Section2";
import { getAllUsers } from "./../../Redux/Chat/chat.action";
import Welcome from "./Welcome";
import { User } from "../../Redux/Chat/chat.actionType";

const socket: io.Socket = io.connect("http://localhost:5000");

const ChatComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { userInfo, allUsers } = useAppSelector((store) => store.chat);
  const [currentChat, setCurrentChat] = useState<User | undefined>(undefined);
  const loggedUser = JSON.parse(localStorage.getItem("logged_user") as string);

  useEffect(() => {
    dispatch(getAllUsers(loggedUser));
  }, [dispatch, loggedUser]);

  function handleChatChange(chat: User) {
    console.log(chat);
    setCurrentChat(chat);
  }
  useEffect(() => {
    if (userInfo) {
      socket.emit("add-user", userInfo?._id);
    }
  }, [userInfo]);

  return (
    <div>
      <div className="flex max-[480px]:flex-col max-[480px]:w-full max-[480px]:h-screen border-2 bg-formBg border-solid items-center mt-4 h-[85vh] w-[85vw] m-auto ">
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
