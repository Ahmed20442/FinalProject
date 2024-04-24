// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxmAe0aXV_34C1P2w3q08AlOxqp1eKl9I",
  authDomain: "finalproject-5768e.firebaseapp.com",
  projectId: "finalproject-5768e",
  storageBucket: "finalproject-5768e.appspot.com",
  messagingSenderId: "993966293767",
  appId: "1:993966293767:web:e0908c4f3b08f41d573ba2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
export { app, auth, db }