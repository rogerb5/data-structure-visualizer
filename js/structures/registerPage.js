import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { updateProfile } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

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

let Email = document.getElementById('email');
let FullName = document.getElementById('fullname');
let Username = document.getElementById('username');
let Password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPassword');

let RegisterUser = evt => {
    evt.preventDefault();

    if (Password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return;
    }

    createUserWithEmailAndPassword(auth, Email.value, Password.value)
    .then((userCredential)=>{
        let user = userCredential.user;
        // Set the display name for the user
    return updateProfile(user, { displayName: Username.value })
    .then(function() {
        // Update successful
        console.log("Display name updated successfully!");
        return userCredential;
    }).catch(function(error) {
        // An error occurred
        console.log("Error updating display name: " + error.message);
        throw error;
            });
        })
    .then((userCredential) => {
        alert("User Created!");
        console.log(userCredential);
        window.location.href = 'index.html';
    })
    .catch((error)=>{
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
}
registrationForm.addEventListener('submit', RegisterUser);