import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firestoreApp } from "../../firebase/config";

import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./";
import { loadNotes } from "../../helpers";

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
