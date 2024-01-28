import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

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

let RegisterUser = evt => {
    evt.preventDefault();

    createUserWithEmailAndPassword(auth, Email.value, Password.value)
    .then((credentials)=>{
        console.log(credentials);
    })
    .catch((error)=>{
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
}

MainForm.addEventListener('submit', RegisterUser)