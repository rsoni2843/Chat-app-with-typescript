import React, { FC } from "react";
import { logout } from "./../../Redux/Login/login.action";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { useNavigate } from "react-router-dom";

// interface UserInfo {
//   email: string;
//   username: string;
//   avatarImage: string;
//   _id: string;
// }

const ChatComponent: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((store) => store.chat);
  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }
  console.log(userInfo)
  return (
    <div>
      <div className="flex justify-evenly">
        <h3>Chat</h3>
        <button onClick={handleLogout}>Logout</button>
        <h1>{userInfo?.email ? userInfo?.email : ""}</h1>
      </div>
    </div>
  );
};

export default ChatComponent;
