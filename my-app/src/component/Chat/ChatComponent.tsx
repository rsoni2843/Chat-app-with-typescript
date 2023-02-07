import React, { FC, useEffect, useState, useRef } from "react";
import { logout } from "./../../Redux/Login/login.action";
import * as io from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { useNavigate } from "react-router-dom";
import AllUsersSection from "./AllUsersSection";
import ChatSection from "./ChatSection";
import { getAllUsers } from "./../../Redux/Chat/chat.action";
import Welcome from "./Welcome";

const socket = io.connect("http://localhost:5000");

const ChatComponent: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo, allUsers } = useAppSelector((store) => store.chat);
  const [currentChat, setCurrentChat] = useState(undefined);
  const loggedUser = JSON.parse(localStorage.getItem("logged_user") as string);
  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }
  useEffect(() => {
    dispatch(getAllUsers(loggedUser));
  }, [dispatch, loggedUser]);

  function handleChatChange(chat: any) {
    setCurrentChat(chat);
  }
  useEffect(() => {
    if (userInfo) {
      socket.emit("add-user", userInfo?._id);
    }
  }, [userInfo]);

  return (
    <div>
      <div className="flex justify-evenly">
        <h3>Chat</h3>
        <button onClick={handleLogout}>Logout</button>
        <h1>{userInfo?.email ? userInfo?.email : ""}</h1>
      </div>
      <div className="flex md:flex-row border-2 bg-formBg border-solid h-[85vh] w-[85vw] m-auto ">
        <AllUsersSection
          allUsers={allUsers}
          user={userInfo}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome user={userInfo} />
        ) : (
          <ChatSection
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
