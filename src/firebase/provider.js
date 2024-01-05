import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;

    return { ok: true, displayName, email, photoURL, uid };
  } catch (error) {
    const errorMessage = error.message;
    return { ok: false, errorMessage };
  }
};

export const registerUserWithEmailPassword = async ({
  displayName,
  email,
  password,
}) => {
  try {
    console.log({
      displayName,
      email,
      password,
    });
    const res = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    console.log("provider");
    const { uid, photoURL } = res.user;

    console.log("provider", res);

    // TODO: update the user displayName
    return { ok: true, displayName, email, photoURL, uid };
  } catch (error) {
    const errorMessage = error.message;
    return { ok: false, errorMessage };
  }
};
