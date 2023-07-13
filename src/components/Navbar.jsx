import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import profile_img from "../images/profile.jpg";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex items-center bg-neutral-800 p-6 justify-between text-neutral-300">
      <span className="font-semibold text-lg hidden 2xl:flex">Can Message</span>
      <div className="flex gap-x-3 items-center">
        <img
          className="bg-neutral-300 h-8 w-8 rounded-[50%] object-cover"
          src={currentUser.photoURL}
        ></img>
        <span className="text-sm">{currentUser.displayName}</span>
        <button
          onClick={() => signOut(auth)}
          className="bg-neutral-700 pl-2 pr-2 pt-1 pb-1 text-sm cursor-pointer rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
