import 'firebase/firestore';
import 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBzimoLPFzxHuFnxvBri-63vlHdS9rvyQQ",
    authDomain: "journal-app-c9535.firebaseapp.com",
    projectId: "journal-app-c9535",
    storageBucket: "journal-app-c9535.appspot.com",
    messagingSenderId: "729700825820",
    appId: "1:729700825820:web:f6ee29f97b6658deed5219"
};


initializeApp(firebaseConfig);

export const db = getFirestore();

export const googleAuthProvider = new GoogleAuthProvider();



