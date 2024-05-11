import { getAuth, signInWithEmailAndPassword, signOut, UserCredential } from "firebase/auth";
import { firebaseApp } from "./firebase";

/* 
   We use firebase SDK v9
   see doc https://firebase.google.com/docs/reference/js/auth.md
*/

const auth = getAuth(firebaseApp);

// Sign in with email and password
export async function signIn(email: string, password: string):Promise<UserCredential | Error> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password).catch((error) => {
    return  new Error("Email or password is incorrect");
  });
  return userCredential;
}