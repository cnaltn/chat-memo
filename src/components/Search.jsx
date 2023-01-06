import React, { useContext, useState } from "react";
import profile_img2 from "../images/profile2.jpg";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  query,
  doc,
  where,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { async } from "@firebase/util";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState();

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group (chats in firestore) exists.
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  return (
    <div className="">
      <div className="pl-6 pt-3 pb-3 pr-6 border-b border-b-gray-500 ">
        <input
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Find a user"
          className="bg-transparent w-full text-neutral-200 placeholder:text-neutral-400 focus:outline-none"
          type="text"
        ></input>
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div
          onClick={handleSelect}
          className="pl-6 pt-3 pb-3 pr-6 flex items-center gap-x-2 text-neutral-200 cursor-pointer hover:bg-neutral-800"
        >
          <img
            className=" w-12 h-12 rounded-[50%] object-cover"
            src={user.photoURL}
          ></img>
          <div>
            <span className="font-semibold">{user.displayName}</span>
            <span>{user.lastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
