<?php
try {
    // Create a PDO connection to MySQL
    $pdo = new PDO("mysql:host=db;dbname=MYSQL_DATABASE", "MYSQL_USER", "MYSQL_PASSWORD");
    
    // Get the PDO MySQL driver version
    $pdo_mysql_version = $pdo->getAttribute(PDO::ATTR_CLIENT_VERSION);

    // Output the version
    echo "PDO MySQL Driver Version: " . $pdo_mysql_version;
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>