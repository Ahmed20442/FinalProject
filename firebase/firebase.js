// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbowxsfHJSQaR57XUThXZslE2Y66K18lY",
  authDomain: "user-4ac77.firebaseapp.com",
  projectId: "user-4ac77",
  storageBucket: "user-4ac77.appspot.com",
  messagingSenderId: "808496771541",
  appId: "1:808496771541:web:b366568f0399d305970d5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
export { app, auth, db }