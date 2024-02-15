import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Grid, TextField, Typography } from "@mui/material";
import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { useForm } from "../../hooks";
import { ImageGallery } from "../components";
import {
  setActiveNote,
  startDeleteNote,
  startSaveNote,
  startUploadFiles,
} from "../../store/journal";

export const NoteView = () => {
  const {
    active: activeNote,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journalReducer);

  const dispatch = useDispatch();

  const { body, title, date, handleInputChange, formState } =
    useForm(activeNote);

  const dateString = useMemo(() => {
    const newDate = new Date(date);

    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Note updated", messageSaved, "success");
    }
  }, [messageSaved]);

  const handleSaveNote = () => {
    dispatch(startSaveNote());
  };

  const handleFileChange = ({ target }) => {
    if (target.files.length === 0) return;
    dispatch(startUploadFiles(target.files));
  };

  const hadleDeleteNote = () => {
    dispatch(startDeleteNote());
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
        <input
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        <Button
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          Upload Files
          <UploadOutlined />
        </Button>

        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={handleSaveNote}
          disabled={isSaving}
        >
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

      <Grid container justifyContent="end">
        <Button onClick={hadleDeleteNote} sx={{ mt: 2 }} color="error">
          Borrar
          <DeleteOutline />
        </Button>
      </Grid>

      <ImageGallery images={activeNote.imageUrls} />
    </Grid>
  );
};
