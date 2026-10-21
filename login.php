<?php
session_start();
include "db.php";


if (trim($_POST["username"] ?? "") === "" || ($_POST["password"] ?? "") === "") {
  echo "Please enter your username and password";
  exit;
}


$username = trim($_POST["username"]);
$password = $_POST["password"];


$stmt = mysqli_prepare($conn, "SELECT id, password FROM users WHERE username = ?");
mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$user = mysqli_fetch_assoc($result);


if ($user && password_verify($password, $user["password"])) {
  $_SESSION["user_id"]  = $user["id"];    
  $_SESSION["username"] = $username;
  echo "success";
} else {
  echo "Wrong username or password";
}
?>