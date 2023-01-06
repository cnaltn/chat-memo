import React, { useEffect, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendEmailVerification } from "firebase/auth";

const Register = () => {
  const [err, setErr] = useState();
  const [isUploaded, setUploaded] = useState();
  const [isFileSelected, setFileSelected] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isFileSelected);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    // if (file) {
    //   setFile(true);
    // } else {
    //   setFile(false);
    // }

    try {
      if (file) {
        setFileSelected(true);

        const res = await createUserWithEmailAndPassword(auth, email, password);
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("Upload is " + progress + "% done");
            setUploaded(progress);
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
            setErr(true);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                });
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });
                await setDoc(doc(db, "userChats", res.user.uid), {});
                const verifySender = await sendEmailVerification(
                  auth.currentUser
                );
                signOut(auth);
                navigate("/login");

                // ...
              }
            );
          }
        );
        setErr(false);
      } else {
        setFileSelected(false);
      }
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div
      id="register"
      className=" h-[100vh] bg-neutral-900 flex items-center justify-center"
    >
      <div className="bg-white tracking-tighter p-20 h-[max] rounded shadow-md flex flex-col ">
        <form onSubmit={handleSubmit} className="flex flex-col w-72">
          <div className="text-center flex flex-col pb-6">
            <p className="text-3xl font-semibold text-neutral-700">Memo Chat</p>
            <p className="text-xl font-thin">Register</p>
          </div>
          <div className="flex flex-col gap-y-3">
            <input
              className="border-gray-300 border p-2 bg-gray-100 placeholder:text-sm focus:outline-none"
              type="text"
              placeholder="Username"
            ></input>
            <input
              className="border-gray-300 border p-2 bg-gray-100 placeholder:text-sm focus:outline-none"
              type="email"
              placeholder="E-mail"
            ></input>
            <input
              className="border-gray-300 border p-2 bg-gray-100 placeholder:text-sm focus:outline-none"
              type="password"
              placeholder="Password"
            ></input>
            <input style={{ display: "none" }} type="file" id="file"></input>
            <label
              htmlFor="file"
              className="flex items-center gap-x-2 cursor-pointer w-max"
            >
              <BsFillImageFill className="text-orange-300 text-3xl"></BsFillImageFill>
              <span className="">Add an avatar</span>
            </label>
            <button className="bg-orange-500 tracking-tighter rounded font-thin pt-1 pb-1 text-white">
              Sign Up
            </button>
          </div>

          {err == false && (
            <span className="text-orange-500">
              You successfully signed up! Please wait while your avatar
              uploading! Upload is{" "}
              <span className="font-bold">{parseInt(isUploaded) + "% "}</span>
              done
            </span>
          )}
          {err == true && (
            <span className="text-red-500">
              This e-mail already in use or password is too short.
            </span>
          )}
          {isFileSelected == false && (
            <span className="text-red-500">You have to add an avatar!</span>
          )}
        </form>
        <div className="flex pt-6 text-md">
          <p className="">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 underline font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
