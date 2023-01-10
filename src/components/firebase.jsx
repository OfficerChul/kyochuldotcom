// Import the functions you need from the SDKs you need
// import firebase from "firebase/app";

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



// const firebaseConfig = {
//     //   apiKey: process.env.FB_APIKEY,
//     apiKey: process.env.REACT_APP_FB_APIKEY,
//     authDomain: "kyochuldotcom.firebaseapp.com",
//     databaseURL: "https://kyochuldotcom-default-rtdb.firebaseio.com",
//     projectId: "kyochuldotcom",
//     storageBucket: "kyochuldotcom.appspot.com",
//     messagingSenderId: "238445609698",
//     appId: "1:238445609698:web:87b4957bda50800a10d4bb",
//     // measurementId: process.env.MEASUREMENTID
//     measurementId: process.env.REACT_APP_MEASUREMENTID
// };

// console.log(`${process.env.REACT_APP_FB_APIKEY}`);
// console.log(`${process.env.REACT_APP_MEASUREMENTID}`);
// console.log("DSADASD11");

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_APIKEY,
    authDomain: "kyochuldotcom-b862e.firebaseapp.com",
    projectId: "kyochuldotcom-b862e",
    storageBucket: "kyochuldotcom-b862e.appspot.com",
    messagingSenderId: "709414538271",
    appId: "1:709414538271:web:21c43a304dbfbe23c7192a",
    measurementId: process.env.REACT_APP_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;
// export const db = getFirestore(app);

