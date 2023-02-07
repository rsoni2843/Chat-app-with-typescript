import React, { FC } from "react";

interface MsgType {
  fromSelf: boolean;
  message: string;
}

interface PropsType {
  msg: MsgType[];
}

const Messages: FC<PropsType> = ({ msg }) => {
  return (
    <>
      <div className="border-2   h-[80%] border-dotted border-white">
        <div>
          {msg?.map((el) => {
            return (
              <div className={el?.fromSelf ? "text-right" : "text-left"}>
                <p>{el?.message}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Messages;
