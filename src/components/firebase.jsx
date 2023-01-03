// Import the functions you need from the SDKs you need
// import firebase from "firebase/app";
import { getFirestore } from "@firebase/firestore";

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {
    //   apiKey: process.env.FB_APIKEY,
    apiKey: "AIzaSyCCT9It3tVOho88yknm82kzzZStpFuqvIU",
    authDomain: "kyochuldotcom.firebaseapp.com",
    databaseURL: "https://kyochuldotcom-default-rtdb.firebaseio.com",
    projectId: "kyochuldotcom",
    storageBucket: "kyochuldotcom.appspot.com",
    messagingSenderId: "238445609698",
    appId: "1:238445609698:web:87b4957bda50800a10d4bb",
    // measurementId: process.env.MEASUREMENTID
    measurementId: "G-66WXRJR9KL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);

