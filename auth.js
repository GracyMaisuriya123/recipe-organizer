// Import necessary functions from Firebase SDK
import { auth } from './firebase-config';  // Import auth from your firebase-config.js
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

// Set up event listener for login button
document.getElementById("login-btn").addEventListener("click", () => {
    const provider = new GoogleAuthProvider();  // Create an instance of the Google Auth provider
    signInWithPopup(auth, provider)
        .then(result => {
            console.log("User signed in: ", result.user);
        })
        .catch(error => {
            console.error("Login error: ", error);
        });
});

// Set up event listener for logout button
document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out");
        })
        .catch(error => {
            console.error("Logout error: ", error);
        });
});

// Listen for changes in authentication state
onAuthStateChanged(auth, user => {
    if (user) {
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
    } else {
        document.getElementById("login-btn").style.display = "block";
        document.getElementById("logout-btn").style.display = "none";
    }
});
