import { onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";
import { doc } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { chatData } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatData.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [chatData.chatId]);

  return (
    <div className="bg-white p-3 h-[calc(100%-98px)] overflow-x-hidden">
      {messages.map((m) => (
        <Message messages={m} key={m.id}></Message>
      ))}
    </div>
  );
};

export default Messages;
