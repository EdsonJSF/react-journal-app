import { useMemo } from "react";
import PropTypes from "prop-types";

import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";

export const JournalSideBarListItem = ({ title = "", body }) => {
  const newTitle = useMemo(() => {
    return title.length > 15 ? title.substring(0, 15) + "..." : title;
  }, [title]);

  return (
    <ListItem>
      <ListItemButton>
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

JournalSideBarListItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
