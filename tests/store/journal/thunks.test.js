import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNode } from "../../../src/store/journal/thunks";
import { firebaseDB } from "../../../src/firebase/config";

describe('Tests - JournalThunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('startNewNode - debe de crear una nueva nota en blanco', async () => {

        getState.mockReturnValue({ auth: { uid: 'TEST-UID' } });

        // Thunk
        await startNewNode()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number),
            imagesUrls: []
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number),
            imagesUrls: []
        }));

        // Borrar en Firebase
        const collectionRef = collection(firebaseDB, `${'TEST-UID'}/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));

        await Promise.all(deletePromises);
    })
})