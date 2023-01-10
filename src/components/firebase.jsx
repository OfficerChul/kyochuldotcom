// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyP6ie9PJ56HXqhQ5BBDzaaJNXng8P6As",
  authDomain: "kyochuldotcom-b862e.firebaseapp.com",
  projectId: "kyochuldotcom-b862e",
  storageBucket: "kyochuldotcom-b862e.appspot.com",
  messagingSenderId: "709414538271",
  appId: "1:709414538271:web:21c43a304dbfbe23c7192a",
  measurementId: "G-6EBE4SP1R4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export default db;