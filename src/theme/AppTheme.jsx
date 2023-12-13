import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";

import { journalTheme } from "./journalTheme";

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={journalTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
};
