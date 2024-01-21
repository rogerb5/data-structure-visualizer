// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdVbR-4agnruN2XLkZCrJsfu9ywxw6UgQ",
  authDomain: "data-structures-learning-tool.firebaseapp.com",
  databaseURL: "https://data-structures-learning-tool-default-rtdb.firebaseio.com",
  projectId: "data-structures-learning-tool",
  storageBucket: "data-structures-learning-tool.appspot.com",
  messagingSenderId: "455972295533",
  appId: "1:455972295533:web:9d0b9946e62ada9a488064",
  measurementId: "G-ZDM444BB2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

document.getElementById('Reg').addEventListener('click', (e) => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('User has been created');
      // Redirect logic here
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});