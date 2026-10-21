<?php
include "db.php";
header("Content-Type: application/json");

$result = mysqli_query($conn, "SELECT * FROM products");

$products = [];
while ($row = mysqli_fetch_assoc($result)) {
  $row["price"] = (int) $row["price"];
  $products[] = $row;
}

echo json_encode($products);
?>