import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firestoreApp } from "../../firebase/config";

import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotoToActiveNote,
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
      imageUrls: []
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
    dispatch(setActiveNote(null));
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

    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotoToActiveNote(photosUrls));
  };
};
