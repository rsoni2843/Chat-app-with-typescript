import React, { FC, useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import InputEmoji from "react-input-emoji";

interface PropsType {
  sendMsg: (msg: any) => void;
}

const ChatInput: FC<PropsType> = ({ sendMsg }) => {
  const [msg, setMsg] = useState("");

  function handleOnEnter(text: string) {
    console.log("enter", text);
  }

  return (
    <>
      <div className="flex pb-[0.3rem] h-[15%] items-center ">
        <InputEmoji
          value={msg}
          onChange={setMsg}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Enter to send message"
        />
      </div>
    </>
  );
};

export default ChatInput;
