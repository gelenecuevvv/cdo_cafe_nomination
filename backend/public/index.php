<?php
// Main backend entry point for CDO Café Nomination System
require_once '../config/db.php';
require_once '../utils/helpers.php';

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Simple routing
$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Remove query string
$request = strtok($request, '?');

// Route to appropriate handler
if (strpos($request, '/cafes') === 0) {
    require_once '../routes/cafes.php';
} elseif (strpos($request, '/nominations') === 0) {
    require_once '../routes/nominations.php';
} elseif (strpos($request, '/admin') === 0) {
    require_once '../routes/admin.php';
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}
?>
