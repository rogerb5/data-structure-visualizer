// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBs8bh4xiBuPm3YBLqVGNId3Y8wiptMRHY",
    authDomain: "seniorproject07-fa9c6.firebaseapp.com",
    projectId: "seniorproject07-fa9c6",
    storageBucket: "seniorproject07-fa9c6.appspot.com",
    messagingSenderId: "605296004206",
    appId: "1:605296004206:web:82cc68752684059b846a7f",
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//intialize variables
const auth = firebase.auth();

// Logout function
function logout() {
    auth.signOut().then(function() {
        // Sign-out successful.
        alert("User logged out");
        // Redirect to another page after logout
        location.replace("index.html"); // Replace with the desired page
    }).catch(function(error) {
        // An error happened.
        alert("Error during logout: " + error.message);
    });
}
