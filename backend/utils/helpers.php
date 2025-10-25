<?php
// Helper functions for CDO Café Nomination System

// Sanitize input data
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Validate email format
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Validate Facebook URL format
function validateFacebookUrl($url) {
    if (empty($url)) return true; // Optional field
    return preg_match('/^https:\/\/facebook\.com\/.+/', $url);
}

// Generate unique filename for uploads
function generateUniqueFilename($originalName) {
    $extension = pathinfo($originalName, PATHINFO_EXTENSION);
    return uniqid() . '_' . time() . '.' . $extension;
}

// Upload file and return path
function uploadFile($file, $uploadDir = '../public/uploads/') {
    if (!isset($file['error']) || is_array($file['error'])) {
        throw new RuntimeException('Invalid parameters.');
    }

    switch ($file['error']) {
        case UPLOAD_ERR_OK:
            break;
        case UPLOAD_ERR_NO_FILE:
            return null; // No file uploaded
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            throw new RuntimeException('Exceeded filesize limit.');
        default:
            throw new RuntimeException('Unknown errors.');
    }

    if ($file['size'] > 5000000) { // 5MB limit
        throw new RuntimeException('Exceeded filesize limit.');
    }

    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mimeType = $finfo->file($file['tmp_name']);
    
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($mimeType, $allowedTypes)) {
        throw new RuntimeException('Invalid file format.');
    }

    $filename = generateUniqueFilename($file['name']);
    $filepath = $uploadDir . $filename;

    if (!move_uploaded_file($file['tmp_name'], $filepath)) {
        throw new RuntimeException('Failed to move uploaded file.');
    }

    return 'uploads/' . $filename;
}

// Send JSON response
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// Check if user has reached nomination limit
function checkNominationLimit($userId, $limit = 20) {
    $db = getDB();
    $stmt = $db->prepare("SELECT COUNT(*) as count FROM nominations WHERE user_id = ?");
    $stmt->execute([$userId]);
    $result = $stmt->fetch();
    return $result['count'] < $limit;
}

// Get user's current nomination count
function getUserNominationCount($userId) {
    $db = getDB();
    $stmt = $db->prepare("SELECT COUNT(*) as count FROM nominations WHERE user_id = ?");
    $stmt->execute([$userId]);
    $result = $stmt->fetch();
    return $result['count'];
}

// Check if café already exists (by name only, not coordinates)
function cafeExists($cafeName, $latitude, $longitude) {
    $db = getDB();
    // Only check by name to allow multiple locations for same café
    $stmt = $db->prepare("SELECT cafe_id FROM cafes WHERE cafe_name = ?");
    $stmt->execute([$cafeName]);
    return $stmt->fetch() !== false;
}

// Get café by coordinates
function getCafeByCoordinates($latitude, $longitude) {
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM cafes WHERE latitude = ? AND longitude = ?");
    $stmt->execute([$latitude, $longitude]);
    return $stmt->fetch();
}

// Hash password
function hashPassword($password) {
    return password_hash($password, PASSWORD_DEFAULT);
}

// Verify password
function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

// Start session if not started
function startSession() {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
}

// Check if user is logged in
function isLoggedIn() {
    startSession();
    return isset($_SESSION['user_id']);
}

// Check if admin is logged in
function isAdminLoggedIn() {
    startSession();
    return isset($_SESSION['admin_id']);
}

// Logout user
function logout() {
    startSession();
    session_destroy();
}

// Get client IP address
function getClientIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        return $_SERVER['REMOTE_ADDR'];
    }
}
?>
