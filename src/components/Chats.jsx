import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import profile_img2 from "../images/profile2.jpg";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch, chatData } = useContext(ChatContext);

  useEffect(() => {
    dispatch({ type: "CHANGE_USER", payload: "null" });

    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div>
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              onClick={() => handleSelect(chat[1].userInfo)}
              key={chat[0]}
              className="pl-6 pt-3 pb-3 pr-6 flex items-center gap-x-2 text-neutral-200 cursor-pointer hover:bg-neutral-800"
            >
              <img
                className=" w-12 h-12 rounded-[50%] object-cover"
                src={chat[1].userInfo.photoURL}
              ></img>
              <div className="">
                <span className="font-normal">
                  {chat[1].userInfo.displayName}
                </span>
                <p className="font-thin text-xs text-neutral-20">
                  {chat[1].lastMessage?.owner
                    ? chat[1].lastMessage?.owner + ": "
                    : ""}
                  {chat[1].lastMessage?.text ? chat[1].lastMessage?.text : ""}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Chats;
