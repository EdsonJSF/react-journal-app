import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";

import { status as authStatus } from "../store/auth";
import { CheckingAuth } from "../ui";

export const AppRouter = () => {
  const { status } = useSelector((state) => state.authReducer);

  if (status === authStatus[0]) {
    return <CheckingAuth />;
  }

  if (status)
    return (
      <Routes>
        {/* Login & Register */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* JournalApp */}
        <Route path="/*" element={<JournalRoutes />} />
      </Routes>
    );
};
