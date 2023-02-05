import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice"

export function checkingAuthentication(email, password) {

    return async (dispatch) => {
        // Modificando a checking
        dispatch(checkingCredentials());
    }
}

export function startGoogleSingIn() {
    return async (dispatch) => {
        // Modificando a checking
        dispatch(checkingCredentials());

        // Realizar login con Google y firebase
        const result = await singInWithGoogle();
        if (!result.ok) {
            return dispatch(logout(result))
        } else {
            return dispatch(login(result));
        };
    }
}

export function startCreatingUserWithEmailPassword({ email, password, name }) {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, displayName, errorMessage, photoURL } = await registerUserWithEmailPassword({ email, password, name });

        if (!ok) {
            return dispatch(logout({ errorMessage }));
        } else {
            dispatch(login({ uid, displayName, email, photoURL }));
        }

    }
}

export function startLoginWithEmailPassword({ email, password }) {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, displayName, photoURL, errorMessage } = await loginWithEmailPassword({ email, password });

        if (!ok) {
            return dispatch(logout({ errorMessage }));
        } else {
            dispatch(login({ uid, email, displayName, photoURL, errorMessage }));
        }
    }
}

export function startLogoutFirebase() {
    return async (dispatch) => {
        await logoutFirebase();

        dispatch(logout());
        dispatch(clearNotesLogout());
    }
}