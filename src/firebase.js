import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApyjPn694Ck5ioExAIiw068TRT53BgxJ4",
  authDomain: "memochat-34bce.firebaseapp.com",
  projectId: "memochat-34bce",
  storageBucket: "memochat-34bce.appspot.com",
  messagingSenderId: "1094153464817",
  appId: "1:1094153464817:web:df9b22cf037bcb7aa27250",
  measurementId: "G-M161D70P8R",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
