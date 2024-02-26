 // registerPage.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBs8bh4xiBuPm3YBLqVGNId3Y8wiptMRHY",
    authDomain: "seniorproject07-fa9c6.firebaseapp.com",
    projectId: "seniorproject07-fa9c6",
    storageBucket: "seniorproject07-fa9c6.appspot.com",
    messagingSenderId: "605296004206",
    appId: "1:605296004206:web:82cc68752684059b846a7f",
    };

const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth(app);

const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const fullName = document.getElementById('fullname').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return updateProfile(user, { displayName: username })
                .then(() => {
                    alert("User Created!");
                    console.log("Display name updated successfully!");
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.log("Error updating display name: " + error.message);
                });
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        });
});
