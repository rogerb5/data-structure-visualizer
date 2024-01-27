// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBs8bh4xiBuPm3YBLqVGNId3Y8wiptMRHY",
    authDomain: "seniorproject07-fa9c6.firebaseapp.com",
    projectId: "seniorproject07-fa9c6",
    storageBucket: "seniorproject07-fa9c6.appspot.com",
    messagingSenderId: "605296004206",
    appId: "1:605296004206:web:82cc68752684059b846a7f",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

function register() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  fullname = document.getElementById('fullname').value

  // Validate input fields
  if (!validate_email(email) || !validate_password(password)) {
    alert('Email or Password is not valid!')
    return
    // Don't continue running the code
  }
  if (!validate_field(fullname)) {
    alert('Name is not valid!')
    return
  }
 

  auth.createUserWithEmailAndPassword(email, password)
  .then(function(){
    // Declare user variable
    var user = userCredential.user;
    // Add this user to Firebase Database
    var database_ref = database.ref();
    // Create User data
    var user_data = {
      email: email,
      fullname: fullname,
      last_login: Date.now()
    };

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data);
    alert('User Created!!');
  })
  .catch((error) => {
    // Firebase will use this to alert of its errors
    const error_code = error.code;
    const error_message = error.message;

    alert(error_message);
  });
}