import { Box } from "@mui/system";
import { JournalNavBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <JournalNavBar drawerWidth={drawerWidth} />

      {/* Sidebar drawerWidth */}

      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        {/* Toolbar */}

        {children}
      </Box>
    </Box>
  );
};
