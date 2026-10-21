<?php
session_start();
include "db.php";

// Only logged-in users can check out
if (!isset($_SESSION["user_id"])) {
  echo "Please log in before checking out";
  exit;
}

// The bag arrives as a list of product names, e.g. ["cica bomb", "relief"]
$names = json_decode($_POST["items"] ?? "[]", true);

if (!is_array($names) || count($names) == 0) {
  echo "Your bag is empty";
  exit;
}

// Look up each price in the products table and add up the total
$total = 0;
$items = [];
$stmt = mysqli_prepare($conn, "SELECT price FROM products WHERE name = ?");

foreach ($names as $name) {
  mysqli_stmt_bind_param($stmt, "s", $name);
  mysqli_stmt_execute($stmt);
  $product = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));

  if ($product) {
    $total += $product["price"];
    $items[] = $name;
  }
}

$itemsText = implode(", ", $items);   // e.g. "cica bomb, relief"

// Save the order
$stmt = mysqli_prepare($conn, "INSERT INTO orders (user_id, items, total) VALUES (?, ?, ?)");
mysqli_stmt_bind_param($stmt, "isi", $_SESSION["user_id"], $itemsText, $total);
mysqli_stmt_execute($stmt);

echo "success";
?>