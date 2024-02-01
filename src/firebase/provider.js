import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
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
    const res = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    const { uid, photoURL } = res.user;

    await updateProfile(firebaseAuth.currentUser, { displayName });

    return { ok: true, displayName, email, photoURL, uid };
  } catch (error) {
    const errorMessage = error.message;
    return { ok: false, errorMessage };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const res = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    const { uid, photoURL, displayName } = res.user;

    return { ok: true, displayName, email, photoURL, uid };
  } catch (error) {
    const errorMessage = error.message;
    return { ok: false, errorMessage };
  }
};
