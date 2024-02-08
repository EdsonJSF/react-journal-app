import { collection, getDocs } from "firebase/firestore/lite";
import { firestoreApp } from "../firebase/config";

export const loadNotes = async (uid = "") => {
  if (!uid) throw new Error("The UID doesn't exist");

  const collectionRef = collection(firestoreApp, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  const notes = [];
  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });

  return notes;
};
