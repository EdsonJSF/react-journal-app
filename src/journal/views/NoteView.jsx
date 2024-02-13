import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Grid, TextField, Typography } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";

import { useForm } from "../../hooks";
import { ImageGallery } from "../components";
import { setActiveNote, startSaveNote } from "../../store/journal";

export const NoteView = () => {
  const { active: activeNote } = useSelector((state) => state.journalReducer);

  const dispatch = useDispatch();

  const { body, title, date, handleInputChange, formState } =
    useForm(activeNote);

  const dateString = useMemo(() => {
    const newDate = new Date(date);

    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  const handleSaveNote = () => {
    dispatch(startSaveNote());
  };

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
        <Button color="primary" sx={{ padding: 2 }} onClick={handleSaveNote}>
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
