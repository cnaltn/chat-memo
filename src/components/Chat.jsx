import React, { useContext, useEffect, useState } from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { ChatContext } from "../context/ChatContext";
import Input from "./Input";
import Messages from "./Messages";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import Message from "./Message";

const Chat = () => {
  const { chatData } = useContext(ChatContext);
  const [chatUser, setChatUser] = useState("");
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="w-[60%] lg:w-[70%] ">
      <div className="p-3 h-[50px] flex bg-neutral-700 items-center justify-between">
        <span className="text-neutral-200">{chatData.user?.displayName}</span>
        <div className="flex items-center gap-4 text-neutral-300 cursor-pointer text-xl ">
          <BsCameraVideoFill></BsCameraVideoFill>
          <FaUserPlus></FaUserPlus>
          <FiMoreHorizontal></FiMoreHorizontal>
        </div>
      </div>
      {chatData.user?.displayName ? (
        <Messages></Messages>
      ) : (
        <div className="bg-white p-3 h-[calc(100%-98px)] justify-center items-center flex flex-col overflow-x-hidden">
          <h1 className="text-lg text-gray-500 flex text-center">
            You can choose a conversation from sidebar.
          </h1>
          <h1 className="text-lg text-gray-500 flex text-center">
            If you dont have a conversation, you can find users from search bar.
          </h1>
        </div>
      )}

      <Input></Input>
    </div>
  );
};

export default Chat;
