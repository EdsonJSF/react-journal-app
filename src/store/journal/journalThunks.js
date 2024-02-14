import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firestoreApp } from "../../firebase/config";

import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} from "./";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().authReducer;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(firestoreApp, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().authReducer;

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
    dispatch(setActiveNote(notes.at(-1)));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().authReducer;
    const { active: activeNote } = getState().journalReducer;
    const { id, ...noteToFireStore } = activeNote;

    const docRef = doc(firestoreApp, `${uid}/journal/notes/${id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(activeNote));
  };
};

export const startUploadFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const secure_url = await fileUpload(files[0]);
    console.log({secure_url});
  };
};
