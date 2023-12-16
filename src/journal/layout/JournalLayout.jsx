import { Box, Toolbar } from "@mui/material";

import { JournalNavBar, JournalSideBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <JournalNavBar drawerWidth={drawerWidth} />

      <JournalSideBar drawerWidth={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar></Toolbar>

        {children}
      </Box>
    </Box>
  );
};
