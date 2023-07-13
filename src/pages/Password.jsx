import React, { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Password = () => {
  const [isSend, setSend] = useState(null);
  const [err, setErr] = useState();
  const [area, setArea] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const auth = getAuth();
    try {
      const res = await sendPasswordResetEmail(auth, email);
      setSend(true);
      setArea("");
    } catch (err) {
      setSend(false);
      setArea("");
    }
  };
  return (
    <div
      id=""
      className=" h-[100vh] bg-neutral-900 flex items-center justify-center"
    >
      <div className="bg-white tracking-tighter p-20 rounded shadow-md flex flex-col gap-y-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-5 w-80">
          <div className="text-center">
            <p className="text-3xl font-semibold text-neutral-700">
              Can Message
            </p>
            <p className="text-xl font-thin">Login</p>
          </div>

          <input
            className="border-neutral-500 border-b pb-1 pt-1 focus:outline-none"
            type="email"
            onChange={(e) => setArea(e.target.value)}
            value={area}
            placeholder="E-mail"
          ></input>
          {/* <input
            className="border-neutral-500 border-b pb-1 pt-1 focus:outline-none"
            type="email"
            placeholder="E-mail"
          ></input> */}
          {/* <input
            className="border-neutral-500 border-b pb-1 pt-1 focus:outline-none"
            type="password"
            placeholder="Password"
          ></input> */}
          {/* <input style={{ display: "none" }} type="file" id="file"></input>
          <label
            htmlFor="file"
            className="flex items-center gap-x-2 cursor-pointer w-max"
          >
            <BsFillImageFill className="text-neutral-300 text-3xl"></BsFillImageFill>
            <span className="">Add an avatar</span>
          </label> */}
          <button className="bg-orange-500 tracking-tighter rounded font-thin pt-1 pb-1 text-white">
            Reset Your Password
          </button>
          {isSend == true && (
            <span className="text-green-500">
              Password reset link sended your e-mail.
            </span>
          )}
          {isSend == false && (
            <span className="text-red-500">This e-mail was not signed.</span>
          )}
        </form>
        <p className="text-neutral-800 ">
          You want to login?{" "}
          <Link to="/login" className="text-orange-500 underline font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Password;
