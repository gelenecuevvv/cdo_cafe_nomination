<?php
// Cafes API endpoints
require_once '../config/db.php';
require_once '../utils/helpers.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['REQUEST_URI'];

try {
    switch ($method) {
        case 'GET':
            if (strpos($path, '/cafes/leaderboard') !== false) {
                getLeaderboard();
            } else {
                getCafes();
            }
            break;
        case 'POST':
            createCafe();
            break;
        case 'PUT':
            updateCafe();
            break;
        case 'DELETE':
            deleteCafe();
            break;
        default:
            sendJsonResponse(['error' => 'Method not allowed'], 405);
    }
} catch (Exception $e) {
    sendJsonResponse(['error' => $e->getMessage()], 500);
}

function getCafes() {
    $db = getDB();
    $stmt = $db->prepare("
        SELECT c.*, COUNT(n.nomination_id) as nomination_count
        FROM cafes c
        LEFT JOIN nominations n ON c.cafe_id = n.cafe_id AND n.status = 'approved'
        GROUP BY c.cafe_id
        ORDER BY c.cafe_name
    ");
    $stmt->execute();
    $cafes = $stmt->fetchAll();
    
    sendJsonResponse(['cafes' => $cafes]);
}

function getLeaderboard() {
    $db = getDB();
    $stmt = $db->prepare("
        SELECT c.*, COUNT(n.nomination_id) as nomination_count
        FROM cafes c
        LEFT JOIN nominations n ON c.cafe_id = n.cafe_id AND n.status = 'approved'
        GROUP BY c.cafe_id
        HAVING nomination_count > 0
        ORDER BY nomination_count DESC, c.cafe_name ASC
        LIMIT 10
    ");
    $stmt->execute();
    $leaderboard = $stmt->fetchAll();
    
    sendJsonResponse(['leaderboard' => $leaderboard]);
}

function createCafe() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['cafe_name']) || !isset($input['address']) || 
        !isset($input['latitude']) || !isset($input['longitude'])) {
        sendJsonResponse(['error' => 'Missing required fields'], 400);
    }
    
    $cafeName = sanitizeInput($input['cafe_name']);
    $address = sanitizeInput($input['address']);
    $latitude = floatval($input['latitude']);
    $longitude = floatval($input['longitude']);
    $facebookLink = isset($input['facebook_link']) ? sanitizeInput($input['facebook_link']) : null;
    
    // Validate Facebook URL
    if ($facebookLink && !validateFacebookUrl($facebookLink)) {
        sendJsonResponse(['error' => 'Invalid Facebook URL format'], 400);
    }
    
    // Check if café already exists
    if (cafeExists($cafeName, $latitude, $longitude)) {
        sendJsonResponse(['error' => 'Café already exists at this location'], 409);
    }
    
    $db = getDB();
    $stmt = $db->prepare("
        INSERT INTO cafes (cafe_name, address, latitude, longitude, facebook_link) 
        VALUES (?, ?, ?, ?, ?)
    ");
    
    if ($stmt->execute([$cafeName, $address, $latitude, $longitude, $facebookLink])) {
        $cafeId = $db->lastInsertId();
        sendJsonResponse(['message' => 'Café created successfully', 'cafe_id' => $cafeId], 201);
    } else {
        sendJsonResponse(['error' => 'Failed to create café'], 500);
    }
}

function updateCafe() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['cafe_id'])) {
        sendJsonResponse(['error' => 'Café ID required'], 400);
    }
    
    $cafeId = intval($input['cafe_id']);
    $updates = [];
    $values = [];
    
    if (isset($input['cafe_name'])) {
        $updates[] = "cafe_name = ?";
        $values[] = sanitizeInput($input['cafe_name']);
    }
    
    if (isset($input['address'])) {
        $updates[] = "address = ?";
        $values[] = sanitizeInput($input['address']);
    }
    
    if (isset($input['facebook_link'])) {
        $facebookLink = sanitizeInput($input['facebook_link']);
        if ($facebookLink && !validateFacebookUrl($facebookLink)) {
            sendJsonResponse(['error' => 'Invalid Facebook URL format'], 400);
        }
        $updates[] = "facebook_link = ?";
        $values[] = $facebookLink;
    }
    
    if (isset($input['image_path'])) {
        $updates[] = "image_path = ?";
        $values[] = sanitizeInput($input['image_path']);
    }
    
    if (empty($updates)) {
        sendJsonResponse(['error' => 'No fields to update'], 400);
    }
    
    $values[] = $cafeId;
    $sql = "UPDATE cafes SET " . implode(', ', $updates) . " WHERE cafe_id = ?";
    
    $db = getDB();
    $stmt = $db->prepare($sql);
    
    if ($stmt->execute($values)) {
        sendJsonResponse(['message' => 'Café updated successfully']);
    } else {
        sendJsonResponse(['error' => 'Failed to update café'], 500);
    }
}

function deleteCafe() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['cafe_id'])) {
        sendJsonResponse(['error' => 'Café ID required'], 400);
    }
    
    $cafeId = intval($input['cafe_id']);
    
    $db = getDB();
    $stmt = $db->prepare("DELETE FROM cafes WHERE cafe_id = ?");
    
    if ($stmt->execute([$cafeId])) {
        sendJsonResponse(['message' => 'Café deleted successfully']);
    } else {
        sendJsonResponse(['error' => 'Failed to delete café'], 500);
    }
}
?>
