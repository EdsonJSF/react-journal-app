import { Navigate, Route, Routes } from "react-router-dom";
/* Store */
import { status as authStatus } from "../store/auth";

/* Routes Components */
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";

/* Components */
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === authStatus[0]) {
    return <CheckingAuth />;
  }

  if (status)
    return (
      <Routes>
        {status === authStatus[1] ? (
          /* JournalApp */
          <Route path="/*" element={<JournalRoutes />} />
        ) : (
          /* Login & Register */
          <Route path="/auth/*" element={<AuthRoutes />} />
        )}

        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>
    );
};
