import React, { useContext, useEffect, useState } from "react";
import { MdAttachFile } from "react-icons/md";
import { BsFillImageFill } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { storage } from "../firebase";
import { db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { chatData } = useContext(ChatContext);
  const [uploadStatus, setUploadStatus] = useState();

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
          setUploadStatus(progress);
          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused");
              break;
            case "running":
              // console.log("Upload is running");
              break;
          }
        },
        (error) => {
          //setErr(true);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", chatData.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", chatData.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    setText("");
    setImage(null);

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chatData.chatId + ".lastMessage"]: {
        text,
        owner: currentUser.displayName,
      },

      [chatData.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", chatData.user.uid), {
      [chatData.chatId + ".lastMessage"]: {
        text,
        owner: currentUser.displayName,
      },
      [chatData.chatId + ".date"]: serverTimestamp(),
    });
  };

  return (
    <div className=" h-12 bg-white p-3 flex items-center border-t border-neutral-300">
      <div
        className={
          chatData.user?.displayName ? "flex items-center w-full" : "hidden"
        }
      >
        <input
          className="w-full focus:outline-none placeholder:font-thin"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          type="text"
        ></input>
        <div className="flex items-center gap-x-3">
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
          <label htmlFor="file">
            <MdAttachFile className="text-xl text-neutral-600 cursor-pointer"></MdAttachFile>
          </label>
          <BsFillImageFill className="text-xl text-neutral-600 cursor-pointer"></BsFillImageFill>
          <button
            onClick={handleSend}
            className={
              parseInt(uploadStatus) < 100
                ? "animate-pulse bg-neutral-600 font-thin text-sm pt-2 pb-2 pl-4 pr-4 text-white rounded w-max flex"
                : " bg-neutral-600 font-thin text-sm pt-2 pb-2 pl-4 pr-4 text-white rounded"
            }
          >
            {parseInt(uploadStatus) < 100
              ? "Uploading " + parseInt(uploadStatus) + "%"
              : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
