import React, { FC, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface MsgType {
  fromSelf: boolean;
  message: string;
}

interface PropsType {
  msg: MsgType[];
}
const Messages: FC<PropsType> = ({ msg }) => {
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <>
      <div className="border-2 messageBox overflow-scroll h-[80%] border-dotted border-white">
        <div>
          {msg?.map((el) => {
            return (
              <div
                key={uuidv4()}
                ref={scrollRef}
                className={
                  el?.fromSelf
                    ? " p-2 flex  items-center justify-end  text-right"
                    : " p-2 flex items-center justify-start text-left"
                }
              >
                <p className="p-2 max-w-[40%] break-words pr-4 pl-4 bg-white text-black rounded-lg">
                  {el?.message}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Messages;
