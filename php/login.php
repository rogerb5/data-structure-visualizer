<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "SeniorProject7";
$dbname = "mydb";

//create connection to the server and the database
$conn = new mysqli($servername, $username, $password, $dbname);
//check connection
if($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}

$currentTime = time();


//check if form is filled correctly
if(!isset($_POST["email"], $_POST["Passwrd"])){
    exit("Please fill out the required fields.");
}

//prepare sql to prevent sql injection
if($stmt = $conn->prepare("SELECT user_name, Passwrd FROM registration WHERE email = ?")){
    $stmt->bind_param('s', $_POST["email"]);
    $stmt->execute();
    //store results to check if exists in db
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($user_name, $Passwrd); 
        $stmt->fetch();

        //verify the password
        if(password_verify($_POST["Passwrd"], $Passwrd)){
            session_regenerate_id();
            $_SESSION["loggedin"] = true;
            $_SESSION["email"] = $_POST["email"];
            $_SESSION["user_name"] = $user_name;

             //redirect user to homepage
            header("Location: home.html");
            exit();
        } else{
            //incorrect password
            echo "Incorrect password.";
        }
    } else{
        //incorrect email
        echo "Incorrect username or email";
    }

    $stmt->close();
}
?>