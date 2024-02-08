import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/* FireBase */
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";

/* Store */
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) return dispatch(logout());

      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
      dispatch(startLoadingNotes());
    });
  }, []);

  return { status };
};
