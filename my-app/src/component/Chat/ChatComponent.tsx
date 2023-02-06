import React, { FC, useEffect, useState } from "react";
import { logout } from "./../../Redux/Login/login.action";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { useNavigate } from "react-router-dom";
import AllUsersSection from "./AllUsersSection";
import ChatSection from "./ChatSection";
import { getAllUsers } from "./../../Redux/Chat/chat.action";
import Welcome from "./Welcome";

const ChatComponent: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo, allUsers } = useAppSelector((store) => store.chat);
  const [currentUser, setCurrentUser] = useState(undefined);
  const loggedUser = JSON.parse(localStorage.getItem("logged_user") as string);
  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }
  useEffect(() => {
    dispatch(getAllUsers(loggedUser));
  }, [dispatch, loggedUser]);
  if (userInfo?.avatarImage === "") {
    console.log(userInfo);
  }

  function handleChatChange(chat: any) {
    setCurrentUser(chat);
  }
  console.log(currentUser);
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
        {currentUser === undefined ? (
          <Welcome user={userInfo} />
        ) : (
          <ChatSection currentUser={currentUser} />
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
