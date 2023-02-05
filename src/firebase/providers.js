import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export async function singInWithGoogle() {
    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);

        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName, email, photoURL, uid
        }

    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        return {
            ok: false,
            errorCode, errorMessage, email, credential
        }

    }
}

export async function registerUserWithEmailPassword({ email, password, name }) {
    try {
        const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        // actualizar el displayName en Firebase
        await updateProfile(firebaseAuth.currentUser, { displayName: name });

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName: name
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export async function loginWithEmailPassword({email, password}) {
    try {
        const resp = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, displayName, photoURL } = resp.user;
        
        return {
            ok: true,
            email,
            displayName,
            photoURL,
            uid
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export async function logoutFirebase() {
    return await firebaseAuth.signOut();
}
