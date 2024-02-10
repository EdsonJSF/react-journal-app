import { useSelector } from "react-redux";
import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { JournalSideBarListItem } from "./";

export const JournalSideBar = ({ drawerWidth = 240 }) => {
  const { displayName } = useSelector((state) => state.authReducer);
  const { notes } = useSelector((state) => state.journalReducer);

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>

        <Divider />

        <List>
          {notes.map((note) => (
            <JournalSideBarListItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
