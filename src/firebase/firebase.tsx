import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsrKQZltr841KQl-_GiKG_0_PcnD1RyJk",
  authDomain: "e-value-37653.firebaseapp.com",
  projectId: "e-value-37653",
  storageBucket: "e-value-37653.appspot.com",
  messagingSenderId: "170737041934",
  appId: "1:170737041934:web:8e0cd21ed74c065778325f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
