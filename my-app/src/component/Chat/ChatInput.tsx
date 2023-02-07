import React, { FC, useState } from "react";
// import { BsEmojiSmileFill } from "react-icons/bs";
// import Picker from "emoji-picker-react";
// import { IoMdSend } from "react-icons/io";
import InputEmoji from "react-input-emoji";

interface PropsType {
  sendMsg: (msg: string) => void;
}

const ChatInput: FC<PropsType> = ({ sendMsg }) => {
  const [msg, setMsg] = useState("");

  function handleOnEnter(text: string) {
    if (text.length > 0) {
      sendMsg(text);
    }
  }

  return (
    <>
      <div className="flex pb-[0.3rem] h-[10%] items-center ">
        <InputEmoji
          value={msg}
          onChange={setMsg}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
      </div>
    </>
  );
};

export default ChatInput;
