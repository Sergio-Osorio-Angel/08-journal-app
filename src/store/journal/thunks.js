import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export function startNewNode() {
    return async (dispatch, getState) => {
        // La función getState(), trae todos los states del store
        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imagesUrls: []
        };

        const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
        const setDocResp = await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;

        dispatch(setActiveNote(newNote));
        dispatch(addNewEmptyNote(newNote));
    }
}

export function startLoadingNotes() {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export function startSaveNote() {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(updateNote(note));
    }
}

export function startUploadingFiles(files = []) {
    return async (dispatch) => {
        dispatch(setSaving());

        // await fileUpload(files[0]);
        const filesUploadPromises = [];

        for (const file of files) {
            filesUploadPromises.push( fileUpload(file) );
        }

        const photosUrls = await Promise.all(filesUploadPromises);
        
        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export function startDeletingNote() {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        const {active:note} = getState().journal;

        const docRef = doc(firebaseDB, `/${uid}/journal/notes/${note.id}`);
        
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}