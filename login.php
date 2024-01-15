<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "SeniorProject7";
$dbname = "mydb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (!isset($_POST["email"], $_POST["Passwrd"])) {
    exit("Please fill out the required fields.");
}

$email = $_POST["email"];
$password = $_POST["Passwrd"];

$stmt = $conn->prepare("SELECT user_name, Passwrd FROM registration WHERE email = ?");
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->bind_result($user_name, $hashed_password);
$stmt->fetch();

// debug: print values
echo "User Name: $user_name<br>";
echo "Entered Password: $password<br>";
echo "Stored Hash: $hashed_password<br>";

if (password_verify($password, $hashed_password)) {
    echo "Password verification successful";
} else {
    echo "Incorrect email or password.";
}

$stmt->close();
$conn->close();
?>


