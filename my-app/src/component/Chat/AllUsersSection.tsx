import React, { FC, useState } from "react";
import { UserInfo } from "../../Redux/Chat/chat.reducer";
import { FaPowerOff } from "react-icons/fa";
import ChatSection from "./ChatSection";
import "./chat.css";
import { useAppDispatch } from "../../Redux/hooks";
import { logout } from "../../Redux/Login/login.action";
import { useNavigate } from "react-router-dom";

interface PropsType {
  user: UserInfo | null;
  allUsers: UserInfo[] | null;
  changeChat: any;
}

// function changeCurrentChat() {}

const AllUsersSection: FC<PropsType> = ({ user, allUsers, changeChat }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState<number | undefined>(undefined);

  function handleChangeChat(el: UserInfo, i: number) {
    setCurrentChat(i);
    changeChat(el);
  }
  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }
  // console.log(currentChat);
  return (
    <>
      <div className=" usersBox ">
        {user?.avatarImage && user?.username && allUsers && (
          <div>
            <div className="flex items-center justify-around gap-10">
              <h3>{user?.username}</h3>
              <img
                className="h-20"
                src={`data:image/svg+xml;base64,${user?.avatarImage}`}
                alt="AvatarImage"
              />
              <FaPowerOff
                onClick={handleLogout}
                className="bg-[red] cursor-pointer transition-all ease-in duration-200 hover:text-3xl p-1 rounded-md text-2xl"
              />
            </div>
            <div className="flex flex-col items-center  overflow-auto gap-3  p-2">
              {allUsers?.map((el, i) => {
                return (
                  <div
                    onClick={() => handleChangeChat(el, i)}
                    className={
                      currentChat === i
                        ? "flex items-center transition cursor-pointer rounded w-[98%] bg-tertiary p-3  gap-16"
                        : "flex items-center transition cursor-pointer rounded w-[98%] bg-formBg p-3  gap-16"
                    }
                    key={i}
                  >
                    <img
                      className="h-16"
                      src={`data:image/svg+xml;base64,${el?.avatarImage}`}
                      alt={el?.username + "allUsersAvatar"}
                    />
                    <p className="items-center">{el?.username}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllUsersSection;
