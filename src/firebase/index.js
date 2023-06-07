// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_kveSJaLVy9-DuwQJr-6QIsaSZ3K6zkg",
  authDomain: "finals-aa076.firebaseapp.com",
  projectId: "finals-aa076",
  storageBucket: "finals-aa076.appspot.com",
  messagingSenderId: "435702171116",
  appId: "1:435702171116:web:a07280465ead57b3e36cc9",
  measurementId: "G-SDVPLGLE7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export{db, auth}
