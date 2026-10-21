<?php
include "db.php";


if (trim($_POST["fullname"] ?? "") === "" ||
    trim($_POST["email"] ?? "") === "" ||
    trim($_POST["username"] ?? "") === "" ||
    ($_POST["password"] ?? "") === "") {
  echo "Please fill in all the fields";
  exit;
}

$fullname = $_POST["fullname"];
$gender   = $_POST["gender"] ?? "";  
$email    = $_POST["email"];
$username = $_POST["username"];
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);


$stmt = mysqli_prepare($conn, "SELECT id FROM users WHERE username = ?");
mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);
mysqli_stmt_store_result($stmt);

if (mysqli_stmt_num_rows($stmt) > 0) {
  echo "Username already taken";
  exit;
}


$stmt = mysqli_prepare($conn, "INSERT INTO users (fullname, gender, email, username, password) VALUES (?, ?, ?, ?, ?)");
mysqli_stmt_bind_param($stmt, "sssss", $fullname, $gender, $email, $username, $password);
mysqli_stmt_execute($stmt);

echo "success";
?>