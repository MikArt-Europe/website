import {initializeApp, getApps} from "firebase/app";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBxSEFbD-Jm_cX8JGWDiptwR0tW5hcim1k",
    authDomain: "mikart-europe.firebaseapp.com",
    projectId: "mikart-europe",
    storageBucket: "mikart-europe.appspot.com",
    messagingSenderId: "368796435511",
    appId: "1:368796435511:web:3160359f8235db0020abb2",
    measurementId: "G-S3ST64RNYL"
};

export const firebaseApp =  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(firebaseApp);
