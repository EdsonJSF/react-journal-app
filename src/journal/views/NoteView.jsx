import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";

import { useForm } from "../../hooks";
import { ImageGallery } from "../components";

export const NoteView = () => {
  const { active: activeNote } = useSelector((state) => state.journalReducer);

  const { body, title, date, handleInputChange, formState } =
    useForm(activeNote);

  const dateString = useMemo(() => {
    const newDate = new Date(date);

    return newDate.toUTCString();
  }, [date]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Typography fontSize={39} fontWeight="light">
        {dateString}
      </Typography>

      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Insert a title"
          label="Title"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={handleInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          minRows={5}
          placeholder="Whatsup today"
          sx={{ border: "none", mb: 1 }}
          name="body"
          value={body}
          onChange={handleInputChange}
        />
      </Grid>

      <ImageGallery />
    </Grid>
  );
};
