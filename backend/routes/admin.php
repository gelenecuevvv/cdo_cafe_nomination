<?php
// Admin API endpoints
require_once '../config/db.php';
require_once '../utils/helpers.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['REQUEST_URI'];

try {
    switch ($method) {
        case 'POST':
            if (strpos($path, '/admin/login') !== false) {
                adminLogin();
            } else if (strpos($path, '/admin/logout') !== false) {
                adminLogout();
            }
            break;
        case 'GET':
            if (strpos($path, '/admin/dashboard') !== false) {
                getDashboardData();
            } else if (strpos($path, '/admin/nominations') !== false) {
                getAdminNominations();
            }
            break;
        default:
            sendJsonResponse(['error' => 'Method not allowed'], 405);
    }
} catch (Exception $e) {
    sendJsonResponse(['error' => $e->getMessage()], 500);
}

function adminLogin() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['username']) || !isset($input['password'])) {
        sendJsonResponse(['error' => 'Username and password required'], 400);
    }
    
    $username = sanitizeInput($input['username']);
    $password = $input['password'];
    
    $db = getDB();
    $stmt = $db->prepare("SELECT admin_id, username, password FROM admin WHERE username = ?");
    $stmt->execute([$username]);
    $admin = $stmt->fetch();
    
    if ($admin && verifyPassword($password, $admin['password'])) {
        startSession();
        $_SESSION['admin_id'] = $admin['admin_id'];
        $_SESSION['admin_username'] = $admin['username'];
        
        sendJsonResponse([
            'message' => 'Login successful',
            'admin_id' => $admin['admin_id'],
            'username' => $admin['username']
        ]);
    } else {
        sendJsonResponse(['error' => 'Invalid credentials'], 401);
    }
}

function adminLogout() {
    startSession();
    session_destroy();
    sendJsonResponse(['message' => 'Logout successful']);
}

function getDashboardData() {
    startSession();
    if (!isAdminLoggedIn()) {
        sendJsonResponse(['error' => 'Unauthorized'], 401);
    }
    
    $db = getDB();
    
    // Get total cafes
    $stmt = $db->prepare("SELECT COUNT(*) as total FROM cafes");
    $stmt->execute();
    $totalCafes = $stmt->fetch()['total'];
    
    // Get total nominations
    $stmt = $db->prepare("SELECT COUNT(*) as total FROM nominations");
    $stmt->execute();
    $totalNominations = $stmt->fetch()['total'];
    
    // Get pending nominations
    $stmt = $db->prepare("SELECT COUNT(*) as total FROM nominations WHERE status = 'pending'");
    $stmt->execute();
    $pendingNominations = $stmt->fetch()['total'];
    
    // Get top cafes
    $stmt = $db->prepare("
        SELECT c.cafe_name, COUNT(n.nomination_id) as nomination_count
        FROM cafes c
        LEFT JOIN nominations n ON c.cafe_id = n.cafe_id AND n.status = 'approved'
        GROUP BY c.cafe_id
        ORDER BY nomination_count DESC
        LIMIT 5
    ");
    $stmt->execute();
    $topCafes = $stmt->fetchAll();
    
    sendJsonResponse([
        'total_cafes' => $totalCafes,
        'total_nominations' => $totalNominations,
        'pending_nominations' => $pendingNominations,
        'top_cafes' => $topCafes
    ]);
}

function getAdminNominations() {
    startSession();
    if (!isAdminLoggedIn()) {
        sendJsonResponse(['error' => 'Unauthorized'], 401);
    }
    
    $db = getDB();
    $stmt = $db->prepare("
        SELECT n.*, c.cafe_name, c.address, u.name as user_name, u.email
        FROM nominations n
        JOIN cafes c ON n.cafe_id = c.cafe_id
        LEFT JOIN users u ON n.user_id = u.user_id
        ORDER BY n.created_at DESC
    ");
    $stmt->execute();
    $nominations = $stmt->fetchAll();
    
    sendJsonResponse(['nominations' => $nominations]);
}
?>
