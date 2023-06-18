// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAshegn5h1mTs4nyHMGxtumXEu8l5qOE7Y",
  authDomain: "tinder-3-c5d9e.firebaseapp.com",
  projectId: "tinder-3-c5d9e",
  storageBucket: "tinder-3-c5d9e.appspot.com",
  messagingSenderId: "480059993256",
  appId: "1:480059993256:web:81ed8bc1998f478863a69d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
