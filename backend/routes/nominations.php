<?php
// Nominations API endpoints
require_once '../config/db.php';
require_once '../utils/helpers.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');
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
            getNominations();
            break;
        case 'POST':
            createNomination();
            break;
        case 'PATCH':
            updateNominationStatus();
            break;
        default:
            sendJsonResponse(['error' => 'Method not allowed'], 405);
    }
} catch (Exception $e) {
    sendJsonResponse(['error' => $e->getMessage()], 500);
}

function getNominations() {
    $db = getDB();
    $status = isset($_GET['status']) ? $_GET['status'] : null;
    
    if ($status) {
        // Filter by specific status
        $stmt = $db->prepare("
            SELECT n.*, c.cafe_name, c.address, c.latitude, c.longitude, c.facebook_link, c.image_path,
                   u.name as user_name
            FROM nominations n
            JOIN cafes c ON n.cafe_id = c.cafe_id
            LEFT JOIN users u ON n.user_id = u.user_id
            WHERE n.status = ?
            ORDER BY n.created_at DESC
        ");
        $stmt->execute([$status]);
    } else {
        // Get all nominations
        $stmt = $db->prepare("
            SELECT n.*, c.cafe_name, c.address, c.latitude, c.longitude, c.facebook_link, c.image_path,
                   u.name as user_name
            FROM nominations n
            JOIN cafes c ON n.cafe_id = c.cafe_id
            LEFT JOIN users u ON n.user_id = u.user_id
            ORDER BY n.created_at DESC
        ");
        $stmt->execute();
    }
    
    $nominations = $stmt->fetchAll();
    sendJsonResponse(['nominations' => $nominations]);
}

function createNomination() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Debug: Log what we received
    error_log('📝 Received nomination data: ' . json_encode($input));
    
    if (!isset($input['user_id']) || !isset($input['cafe_id']) || !isset($input['reason'])) {
        error_log('❌ Missing fields - user_id: ' . (isset($input['user_id']) ? 'OK' : 'MISSING') . 
                  ', cafe_id: ' . (isset($input['cafe_id']) ? 'OK' : 'MISSING') . 
                  ', reason: ' . (isset($input['reason']) ? 'OK' : 'MISSING'));
        sendJsonResponse(['error' => 'Missing required fields'], 400);
    }
    
    $userId = intval($input['user_id']);
    $cafeId = intval($input['cafe_id']);
    $reason = sanitizeInput($input['reason']);
    
    // Check nomination limit
    if (!checkNominationLimit($userId)) {
        sendJsonResponse(['error' => 'You have reached the maximum number of nominations (20)'], 400);
    }
    
    // Check if user already nominated this café
    $db = getDB();
    $stmt = $db->prepare("SELECT nomination_id FROM nominations WHERE user_id = ? AND cafe_id = ?");
    $stmt->execute([$userId, $cafeId]);
    
    if ($stmt->fetch()) {
        sendJsonResponse(['error' => 'You have already nominated this café'], 409);
    }
    
    // Create nomination
    $stmt = $db->prepare("
        INSERT INTO nominations (user_id, cafe_id, reason, status) 
        VALUES (?, ?, ?, 'pending')
    ");
    
    if ($stmt->execute([$userId, $cafeId, $reason])) {
        $nominationId = $db->lastInsertId();
        $remainingNominations = 20 - getUserNominationCount($userId);
        
        sendJsonResponse([
            'message' => 'Nomination submitted successfully',
            'nomination_id' => $nominationId,
            'remaining_nominations' => $remainingNominations
        ], 201);
    } else {
        sendJsonResponse(['error' => 'Failed to create nomination'], 500);
    }
}

function updateNominationStatus() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['nomination_id']) || !isset($input['status'])) {
        sendJsonResponse(['error' => 'Missing required fields'], 400);
    }
    
    $nominationId = intval($input['nomination_id']);
    $status = sanitizeInput($input['status']);
    
    if (!in_array($status, ['pending', 'approved'])) {
        sendJsonResponse(['error' => 'Invalid status'], 400);
    }
    
    $db = getDB();
    $stmt = $db->prepare("UPDATE nominations SET status = ? WHERE nomination_id = ?");
    
    if ($stmt->execute([$status, $nominationId])) {
        sendJsonResponse(['message' => 'Nomination status updated successfully']);
    } else {
        sendJsonResponse(['error' => 'Failed to update nomination status'], 500);
    }
}
?>
