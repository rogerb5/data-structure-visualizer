<?php
    $servername = "localhost";
    $username = "root";
    $password = "SeniorProject7";

    //Create connection
    $conn = new mysqli($servername, $username, $password);
    //Check connection
    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    }

    //Create database
    $sql = "CREATE DATABASE IF NOT EXISTS myDB";
    if($conn->query($sql) === TRUE){
        echo "Database created successfully";
    } else{
        echo "Error creating database: " . $conn->error;
    }
    $conn->close();

    //Re-create connection, this time connecting to the DB as well
    $dbname = "myDB";
    $conn = new mysqli($servername, $username, $password, $dbname);
    //Check connection
    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    }

    //Create registration table
    $sql = "CREATE TABLE IF NOT EXISTS `registration`(
        `full_name` VARCHAR(50) NOT NULL,
        `user_name` VARCHAR(255) NOT NULL,
        `email` VARCHAR(255) UNIQUE NOT NULL,
        `Passwrd` VARCHAR(255) NOT NULL,
        `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    if($conn->query($sql) === TRUE){
        echo "Table users created successfully";
    } else{
        echo "Error creating database: " . $conn->error;
    }

    //Create error log table
    $sql = "CREATE TABLE IF NOT EXISTS `error_logs`(
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `error_message` TEXT,
        `file_name` VARCHAR(255),
        `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
    )";
    if($conn->query($sql) === TRUE){
        echo "Table error_logs created successfully";
    } else{
        echo "Error creating database: " . $conn->error;
    }

?>