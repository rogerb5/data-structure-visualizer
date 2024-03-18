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

// register function
function register() {
//Get all our input fields
email = document.getElementById('email').value;
password = document.getElementById('password').value;

//validate input fields
if(validate_email(email) == false || validate_password(password) == false){
    alert("email or password are invalid, please try again")
    return;
}
auth.createUserWithEmailAndPassword(email, password)
.then(function(){
    var user = auth.currentUser;

    // Add user to MadLads database
    var database_ref = database.ref();
    
    //Create user data
    var user_data = {
        email: email,
        last_login: Date.now()
    }
    
    database_ref.child("user/" + user.uid).set(user_data);

    alert("User Created");
})
.catch(function(error){
    var error_code = error.code;
    var error_message = error.message;

    alert(error_message)
})

}
//login function
function login() {
    // input fields
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    //validate email and password
    if(validate_email(email) == false || validate_password(password) == false){
        alert("email or password are invalid, please try again")
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
    .then(function(){
        var user = auth.currentUser;

        // Add user to MadLads database
        var database_ref = database.ref();
        
        //Create user data
        var user_data = {
            last_login: Date.now()
        }
        
        database_ref.child("user/" + user.uid).update(user_data);

        alert("User is logged in");
        location.replace("home.html");
    })
    .catch(function (error) {
        var error_message = "Invalid login credentials. Please try again.";

        alert(error_message);
    });
}

//validate input fields
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if(expression.test(email) == true){
        return true;
    } else {
        return false;
    }
}

//validate password
function validate_password(password) {
    if(password < 6){
        return false;
    }else {
        return true;
    }
}

//validate fields
function validate_field(field) {
    if(field == null){
        return false;
    }

    if(field <= 0){
        return false;
    }else {
        return true;
    }
}