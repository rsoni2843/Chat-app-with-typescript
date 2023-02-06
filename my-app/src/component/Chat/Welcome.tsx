import React, { FC } from "react";
import { User } from "../../Redux/Chat/chat.actionType";

interface PropsType {
  user: User | null;
}

const Welcome: FC<PropsType> = ({ user }) => {
  return (
    <>
      <div className="w-3/5 m-auto border-2 h-full border-white border-solid">
        <img
          className="m-auto h-[20rem]"
          src={"https://i.stack.imgur.com/kbVsR.gif"}
          alt="RobotImage"
        />
        <h1 className="text-2xl">Welcome {user?.username}</h1>
      </div>
    </>
  );
};

export default Welcome;
