import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: null,
  // active: {
  //   id: "ABC123",
  //   title: "",
  //   body: "",
  //   date: "123456",
  //   imageUrls: [],
  // },
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
      state.isSaving = false;
    },
    setSaving: (state) => {
      state.isSaving = true;
      // TODO: Error message
    },
    updateNote: (state, action) => {
      state.isSaving = false;

      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });

      // TODO: Show update message
    },
    deleteNoteById: (state, action) => {},
  },
});

export const {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} = journalSlice.actions;
