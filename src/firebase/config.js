// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers/getEnvironments";


const { VITE_APIKEY,
    VITE_AUTHDOMAIN,
    VITE_PROJECTID,
    VITE_STORAGEBUCKET,
    VITE_MESSAGINGSENDERID,
    VITE_APPID } = getEnvironments();

// DEV/PROD !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// const firebaseConfig = {
//     apiKey: "AIzaSyByfGmDbBIdSD5Jx5E8sLkDRQfSxfUICdU",
//     authDomain: "react-journal-app-7db6d.firebaseapp.com",
//     projectId: "react-journal-app-7db6d",
//     storageBucket: "react-journal-app-7db6d.appspot.com",
//     messagingSenderId: "813111606933",
//     appId: "1:813111606933:web:7f313947f1b2ff49ede59c"
// };


// TESTING !!!!!!!!!!!!!!!!!!!!!!!!!!
// const firebaseConfig = {
//     apiKey: "AIzaSyDc1-Hv4M2J6ImpNdR8LcdxgV5QQX6oMec",
//     authDomain: "react-journal-app-tests.firebaseapp.com",
//     projectId: "react-journal-app-tests",
//     storageBucket: "react-journal-app-tests.appspot.com",
//     messagingSenderId: "907728918398",
//     appId: "1:907728918398:web:1d3a9cffbeb57793f5052f"
// };

const firebaseConfig = {
    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERID,
    appId: VITE_APPID
};


// Initialize Firebase, Auth y DB
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);