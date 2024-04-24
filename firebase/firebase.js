// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWe8Jy3AXcmgShxVG0Wbpshn_rbttovvg",
  authDomain: "finalproject-3a156.firebaseapp.com",
  projectId: "finalproject-3a156",
  storageBucket: "finalproject-3a156.appspot.com",
  messagingSenderId: "603746321834",
  appId: "1:603746321834:web:fc6d7dd4edea43b9f917d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
export { app, auth, db }