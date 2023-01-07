import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN, 
  projectId: import.meta.env.VITE_FB_P_ID,
  storageBucket: import.meta.env.VITE_FB_S_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MS,
  appId: import.meta.env.VITE_FB_APPID,
  measurementId: import.meta.env.VITE_FB_MI,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
