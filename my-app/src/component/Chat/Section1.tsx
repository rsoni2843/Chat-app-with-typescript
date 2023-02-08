import React, { FC, useState } from "react";
import { UserInfo } from "../../Redux/Chat/chat.reducer";
import { FaPowerOff } from "react-icons/fa";
import "./chat.css";
import { useAppDispatch } from "../../Redux/hooks";
import { logout } from "../../Redux/Login/login.action";
import { useNavigate } from "react-router-dom";

interface PropsType {
  user: UserInfo | null;
  allUsers: UserInfo[] | null;
  changeChat: (chat: UserInfo) => void;
}

// function changeCurrentChat() {}

const Section1: FC<PropsType> = ({ user, allUsers, changeChat }) => {
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
  const responsiveness =
    "max-[480px]:h-[50vh] max-[480px]:border-b-4 max-[780px]:w-[50%] max-[480px]:w-[100%]";
  return (
    <>
      <div className={"h-full w-[40%] usersBox " + responsiveness}>
        {user?.avatarImage && user?.username && allUsers && (
          <div>
            <div className="flex items-center justify-around gap-10">
              <img
                className="h-20 max-[780px]:w-16 max-[480px]:h-14"
                src={`data:image/svg+xml;base64,${user?.avatarImage}`}
                alt="AvatarImage"
              />
              <h3 className="font-bold max-[780px]:text-base  text-xl max-[480px]:text-sm capitalize">
                {user?.username}
              </h3>
              <FaPowerOff
                onClick={handleLogout}
                className="bg-[red] cursor-pointer transition-all ease-in duration-200 hover:text-3xl p-1 rounded-md  text-2xl max-[480px]:text-xl"
              />
            </div>
            <hr />
            <div className="flex flex-col items-center  overflow-auto gap-3  p-2">
              {allUsers?.map((el, i) => {
                return (
                  <div
                    onClick={() => handleChangeChat(el, i)}
                    className={
                      currentChat === i
                        ? "flex  items-center transition cursor-pointer rounded w-[98%] bg-tertiary p-3  gap-16"
                        : "flex hover:bg-tertiary items-center cursor-pointer rounded w-[98%] bg-formBg p-3  gap-16"
                    }
                    key={i}
                  >
                    <img
                      className="h-16 max-[780px]:w-14 max-[480px]:h-10"
                      src={`data:image/svg+xml;base64,${el?.avatarImage}`}
                      alt={el?.username + "allUsersAvatar"}
                    />
                    <p className="items-center max-[480px]:text-sm capitalize">
                      {el?.username}
                    </p>
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

export default Section1;
