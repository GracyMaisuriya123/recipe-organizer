// Initialize Firebase with your Firebase project configuration
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
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Firebase Authentication
  const auth = firebase.auth();
  
  // Firebase Authentication - Signup
  const signUp = (email, password) => {
      auth.createUserWithEmailAndPassword(email, password)
          .then(userCredential => {
              const user = userCredential.user;
              console.log('User signed up: ', user);
              window.location.href = "recipe.html"; // Redirect to recipe page after successful signup
          })
          .catch(error => console.error('Error: ', error.message));
  };
  
  // Firebase Authentication - Login
  const signIn = (email, password) => {
      auth.signInWithEmailAndPassword(email, password)
          .then(userCredential => {
              const user = userCredential.user;
              console.log('User logged in: ', user);
              window.location.href = "recipe.html"; // Redirect to recipe page after successful login
          })
          .catch(error => console.error('Error: ', error.message));
  };
  
  // Handle the form submit (Sign Up or Log In)
  document.getElementById("auth-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      if (event.submitter.id === "signup-btn") {
          signUp(email, password);
      } else if (event.submitter.id === "login-btn") {
          signIn(email, password);
      }
  });
  