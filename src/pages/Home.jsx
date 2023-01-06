import React, { useEffect } from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

import Login from "./Login";

const Home = () => {
  return (
    <div className="bg-neutral-900 h-[100vh] flex items-center justify-center">
      <div className="shadow-lg rounded w-[70%] h-[85%] flex overflow-hidden">
        <Sidebar></Sidebar>
        <Chat></Chat>
      </div>
    </div>
  );
};

export default Home;
