import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ messages }) => {
  const { currentUser } = useContext(AuthContext);
  const { chatData } = useContext(ChatContext);

  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [messages]);

  return (
    <div
      ref={ref}
      className={
        messages.senderId === currentUser.uid
          ? "owner flex gap-x-5 pb-5"
          : "flex gap-x-5 pb-5"
      }
    >
      <div className="flex flex-col text-gray-500">
        {
          <img
            className=" w-10 h-10 rounded-[50%] object-cover"
            src={
              messages.senderId === currentUser.uid
                ? currentUser.photoURL
                : chatData.user.photoURL
            }
          ></img>
        }
        <span className="flex text-xs pt-2 w-14">
          {messages.date.toDate().toLocaleString("tr-TR")}
        </span>
      </div>
      <section className=" max-w-[80%] flex flex-col gap-y-5">
        <p
          className={
            messages.senderId === currentUser.uid
              ? "rounded-br-xl rounded-tl-xl rounded-bl-xl font-thin text-white p-2 text-sm lg:text-base lg:pl-4 lg:pr-4 lg:pt-2 lg:pb-2 max-w-max"
              : "bg-orange-400 font-thin text-white p-2 text-sm lg:text-base lg:pl-4 lg:pr-4 lg:pt-2 lg:pb-2 max-w-max rounded-br-xl rounded-tr-xl rounded-bl-xl"
          }
        >
          {messages.text}
        </p>
        {messages.image && (
          <img className="w-[50%] rounded" src={messages.image}></img>
        )}
      </section>
    </div>
  );
};

export default Message;
