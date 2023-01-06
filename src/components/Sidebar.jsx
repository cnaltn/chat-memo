import React from "react";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = () => {
  return (
    <div className=" w-[40%] lg:w-[30%] bg-neutral-700">
      <Navbar></Navbar>
      <Search></Search>
      <Chats></Chats>
    </div>
  );
};

export default Sidebar;
