import { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { setActiveNote } from "../../store/journal";

export const JournalSideBarListItem = ({ id, title = "", body, date, imageUrls = [] }) => {
  const newTitle = useMemo(() => {
    return title.length > 15 ? title.substring(0, 15) + "..." : title;
  }, [title]);

  const dispatch = useDispatch();

  const handleActiveNote = () => {
    dispatch(setActiveNote({ id, title, body, date, imageUrls }));
  };

  return (
    <ListItem>
      <ListItemButton onClick={handleActiveNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>

        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
