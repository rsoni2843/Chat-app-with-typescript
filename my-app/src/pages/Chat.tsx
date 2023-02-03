import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { logout } from "./../Redux/Login/login.action";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../Redux/Chat/chat.action";

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((store) => store.chat);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const loggedUser = localStorage.getItem("logged_user");

  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    } else {
      dispatch(getCurrentUser(loggedUser));
    }
  }, [loggedUser, userInfo]);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div>
      <div className="flex justify-evenly">
        <h3>Chat</h3>
        <button onClick={handleLogout}>Logout</button>
        <h1>{userInfo?.email}</h1>
      </div>
    </div>
  );
};

export default Chat;
