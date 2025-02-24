// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
;

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2DIY9MasZIVho93rbK4qV_v7mx2782s8",
    authDomain: "recipe-organizer-4331e.firebaseapp.com",
    projectId: "recipe-organizer-4331e",
    storageBucket: "recipe-organizer-4331e.firebasestorage.app",
    messagingSenderId: "233970066542",
    appId: "1:233970066542:web:fa7ce0b1b8791c3aa8327f",
    measurementId: "G-KPB285DP8L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Now initialize Firebase services using the app
const auth = getAuth(app);
const firestore = getFirestore(app);
const db = getFirestore(app);


// Export the services to use in other parts of your app
export { auth, firestore, db };
