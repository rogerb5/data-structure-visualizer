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

const database = firebase.database();

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
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      // User is signed in
      if (user.displayName) {
          // User has a display name, display it
          document.getElementById('welcomeMessage').innerText = "Welcome " + user.displayName + "!";
      } else {
          // User doesn't have a display name set, provide a default welcome message
          document.getElementById('welcomeMessage').innerText = "Welcome!";
      }
  }
});

// Check if the user is authenticated
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in, get the user ID
      var userId = user.uid;

      // Create a reference to the database with the user ID
      var database1 = firebase.database().ref('users/' + userId);

      // Read data on page load
      database1.once('value').then(function(snapshot) {
        document.getElementById('bst-checkbox').checked = snapshot.val()?.bst || false;
        document.getElementById('doubly-checkbox').checked = snapshot.val()?.doubly || false;
        document.getElementById('maxheap-checkbox').checked = snapshot.val()?.maxheap || false;
        document.getElementById('stack-checkbox').checked = snapshot.val()?.stack || false;
      });

      // Update Checkbox Handling
      document.getElementById('bst-checkbox').addEventListener('change', function() {
        database1.update({ bst: this.checked });
      });

      document.getElementById('doubly-checkbox').addEventListener('change', function() {
        database1.update({ doubly: this.checked });
      });

      document.getElementById('maxheap-checkbox').addEventListener('change', function() {
        database1.update({ maxheap: this.checked });
      });

      document.getElementById('stack-checkbox').addEventListener('change', function() {
        database1.update({ stack: this.checked });
      });
    }
  });
