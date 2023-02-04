import React, { useEffect } from "react";
import { useAppDispatch } from "../Redux/hooks";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../Redux/Chat/chat.action";
import ChatComponent from "../component/Chat/ChatComponent";

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const loggedUser = localStorage.getItem("logged_user");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    } else {
      dispatch(getCurrentUser(loggedUser));
    }
  }, [loggedUser, dispatch, navigate]);

  return (
    <>
      <ChatComponent />
    </>
  );
};

export default Chat;
