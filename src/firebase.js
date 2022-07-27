// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyD5CRdaXCCaA6wo69MeeyByKUyOMg5AwP4",
    authDomain: "revirtspace-61720.firebaseapp.com",
    projectId: "revirtspace-61720",
    storageBucket: "revirtspace-61720.appspot.com",
    messagingSenderId: "610203032758",
    appId: "1:610203032758:web:c3a8cd243bbf0f7d44da17",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
