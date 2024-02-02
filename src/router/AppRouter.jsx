import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/* FireBase */
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";

/* Store */
import { status as authStatus, login, logout } from "../store/auth";

/* Routes Components */
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";

/* Components */
import { CheckingAuth } from "../ui";

export const AppRouter = () => {
  const { status } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) return dispatch(logout);

      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });
  }, []);

  if (status === authStatus[0]) {
    return <CheckingAuth />;
  }

  if (status)
    return (
      <Routes>
        {
          (status === authStatus[1] )
          /* JournalApp */
          ? <Route path="/*" element={<JournalRoutes />} />

          /* Login & Register */
          : <Route path="/auth/*" element={<AuthRoutes />} />
        }

        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>
    );
};
