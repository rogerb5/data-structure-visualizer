<?php
session_start();
if(isset($_SESSION["success_msg"])){
    echo '<div class="success-msg">' . $_SESSION['success_msg'] . '</div>';
    unset($_SESSION["success_msg"]);
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/login.css">
    <title>Data Structure Visualizer Login</title>
</head>

<body>
    <header>
        <h1>Data Structure Visualizer Login</h1>
    </header>
    <div id="content-container">

        <div id="form-content-container">
            <div id="form-content-inner-container">
                <h2 id="form-header">Login or Register</h2>
            <form method="POST" class="form" action="php/login.php">
                <label for="user_name">Username:</label>
                <input type="text" id="user_name" placeholder="Username">

                <label for="email">Email:</label>
                <input type="email" id="email" placeholder="you@example.com">

                <label for="email">Password:</label>
                <input type="passwrd" id="passwrd" placeholder="Password">

                <div id="button-container">
                    <button>
                        <a href="index.html">Login</a>
                    </button>
                    <button>
                        <a href="register.html">Register</a>
                    </button>
                    <button>
                        <a href="forgot.html">Forgot Your Password</a>
                    </button>
                </div>
            </form>
            </div>
        </div>
    </div>
</body>


</html>