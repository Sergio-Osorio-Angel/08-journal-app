import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // 'checking',  'authenticated'
        uid: null,
        email: null,
        userName: null,
        photoURL: null,
        errorMessage: null
    },
    reducers: {
        login: (state, action) => {
            state.status = 'authenticated'
            state.email = action.payload.email;
            state.uid = action.payload.uid;
            state.userName = action.payload.displayName;
            state.photoURL = action.payload.photoURL;
            state.errorMessage = action.payload.errorMessage;
        },
        logout: (state, action) => {
            state.status = 'not-authenticated'
            state.uid = null;
            state.email = null;
            state.userName = null;
            state.photoURL = null;
            state.errorMessage = action.payload?.errorMessage;
        },
        checkingCredentials: (state, /* action */) => {
            state.status = 'checking';
            state.uid = null;
            state.email = null;
            state.userName = null;
            state.photoURL = null;
            state.errorMessage = null;
        },
    }
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;