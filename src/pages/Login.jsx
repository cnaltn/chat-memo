import React, { useEffect, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendEmailVerification } from "firebase/auth";

const Login = () => {
  const [err, setErr] = useState();
  const navigate = useNavigate();
  const [isVerified, setVerified] = useState();
  const [textMail, setTextMail] = useState("");
  const [textPassword, setTextPassword] = useState("");
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user);

      if (res.user.emailVerified == true) {
        setVerified(true);
        setErr(false);
        navigate("/");
      } else {
        setVerified(false);
      }
    } catch (err) {
      setErr(true);
    }
    setTextMail("");
    setTextPassword("");
  };

  return (
    <div
      id=""
      className=" h-[100vh] bg-neutral-900 flex items-center justify-center"
    >
      <div className="bg-white tracking-tighter p-20 h-[max]  rounded shadow-md flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col w-72 ">
          <div className="text-center flex flex-col pb-6">
            <p className="text-3xl font-semibold text-neutral-700">
              Can Message
            </p>
            <p className="text-xl font-thin">Login</p>
          </div>
          <div className="flex flex-col gap-y-3">
            <input
              className="border-gray-300 border p-2 bg-gray-100 placeholder:text-sm focus:outline-none"
              type="email"
              onChange={(e) => setTextMail(e.target.value)}
              placeholder="E-mail"
              value={textMail}
            ></input>
            {/* <input
            className="border-neutral-500 border-b pb-1 pt-1 focus:outline-none"
            type="email"
            placeholder="E-mail"
          ></input> */}
            <input
              className="border-gray-300 border p-2 bg-gray-100 placeholder:text-sm focus:outline-none"
              type="password"
              placeholder="Password"
              onChange={(e) => setTextPassword(e.target.value)}
              value={textPassword}
            ></input>
            {/* <input style={{ display: "none" }} type="file" id="file"></input>
          <label
            htmlFor="file"
            className="flex items-center gap-x-2 cursor-pointer w-max"
          >
            <BsFillImageFill className="text-neutral-300 text-3xl"></BsFillImageFill>
            <span className="">Add an avatar</span>
          </label> */}
            <button className="bg-orange-500 tracking-tighter rounded font-thin pt-1 pb-1 text-white">
              Sign In
            </button>

            {err == false && (
              <span className="text-orange-500">
                You successfully logged in!
              </span>
            )}
            {err == true && (
              <span className="text-red-500">
                Password or E-mail not correct!
              </span>
            )}
            {isVerified == false && (
              <span className="text-red-500 text-justify">
                You have to verify your e-mail, check your{" "}
                <span className="font-semibold">e-mail</span> and{" "}
                <span className="font-semibold">spam</span> folder. If you did
                not get verification link{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => sendEmailVerification(auth.currentUser)}
                >
                  <span className="underline font-bold">click here.</span>
                </span>
              </span>
            )}
          </div>
        </form>
        <div className="flex flex-col pt-6 text-md">
          <p className="text-neutral-800">
            You have not an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 underline font-semibold"
            >
              Sign up
            </Link>
          </p>
          <p className="text-neutral-800">
            Forgot your password?{" "}
            <Link
              to="/password"
              className="text-orange-500 underline font-semibold"
            >
              Reset
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
