import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    console.log("You Are Authenticated Now!");
  }
});
async function register(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred;
}
async function logIn(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}
async function forgetPass(email) {
  await sendPasswordResetEmail(auth, email);
}
export { register, logIn, forgetPass };