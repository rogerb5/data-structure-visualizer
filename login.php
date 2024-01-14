<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "SeniorProject7"; // Change this to your actual database password
$dbname = "mydb"; // Change this to your actual database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Debugging: Check what data is received
var_dump($_POST);

if (isset($_POST["email"], $_POST["Passwrd"])) {
    $email = $_POST["email"];
    $password = $_POST["Passwrd"];

    $stmt = $conn->prepare("SELECT user_name, Passwrd FROM registration WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->bind_result($user_name, $hashed_password);
    $stmt->fetch();

    if (password_verify($password, $hashed_password)) {
        echo "Login successful. Welcome, $user_name!";
        // You can set session variables or redirect to the home page here
    } else {
        echo "Incorrect email or password.";
    }

    $stmt->close();
} else {
    echo "Please fill out the required fields.";
}

$conn->close();
?>

?>

