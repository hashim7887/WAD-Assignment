<?php
// Tells the page if a user is logged in
session_start();
header("Content-Type: application/json");

echo json_encode([
  "loggedIn" => isset($_SESSION["user_id"]),
  "username" => $_SESSION["username"] ?? ""
]);
?>