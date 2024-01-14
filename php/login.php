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

$stmt = $conn->prepare("SELECT user_name, Passwrd FROM registration WHERE email = ?");
$stmt->bind_param('s', $_POST["email"]);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($user_name, $hashed_password);
    $stmt->fetch();

    if (password_verify($_POST["Passwrd"], $hashed_password)) {
        session_regenerate_id();
        $_SESSION["loggedin"] = true;
        $_SESSION["email"] = $_POST["email"];
        $_SESSION["user_name"] = $user_name;

        header("Location: home.html");
        exit();
    } else {
        echo "Incorrect password.";
    }
} else {
    echo "Incorrect username or email";
}

$stmt->close();
$conn->close();
?>
