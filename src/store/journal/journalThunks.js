import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firestoreApp } from "../../firebase/config";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().authReducer;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(firestoreApp, `${uid}/journal/notes`));
    const resp = await setDoc(newDoc, newNote);

    console.log(newDoc, resp);

    // TODO: Create dispatch
    // dispatch (newNote)
    // dispatch (activeNote)
  };
};
