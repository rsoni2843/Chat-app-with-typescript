import React, { FC } from "react";
import { User } from "../../Redux/Chat/chat.actionType";

interface PropsType {
  user: User | null;
}

const Welcome: FC<PropsType> = ({ user }) => {
  const mobileScreen: string = " max-[480px]:h-[50vh] max-[480px]:w-[100vw]";
  return (
    <>
      <div
        className={
          "w-3/5  m-auto border-2 h-full border-white border-solid" +
          mobileScreen
        }
      >
        <img
          className="m-auto h-[20rem] max-[480px]:h-[14rem]"
          src={"https://i.stack.imgur.com/kbVsR.gif"}
          alt="RobotImage"
        />
        <h1 className="text-2xl max-[480px]:text-xl capitalize">
          Welcome {user?.username}
        </h1>
        <p>Select a user you want to chat with...</p>
      </div>
    </>
  );
};

export default Welcome;
