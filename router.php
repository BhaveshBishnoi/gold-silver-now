<?php
// Simple Router for PHP Built-in Server
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Serve static files as is
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Map clean URLs to PHP files
if ($uri === '/' || $uri === '/home') {
    require __DIR__ . '/index.php';
} elseif ($uri === '/about') {
    require __DIR__ . '/about.php';
} elseif ($uri === '/contact') {
    require __DIR__ . '/contact.php';
} elseif ($uri === '/privacy-and-policy') {
    require __DIR__ . '/privacy-and-policy.php';
} elseif ($uri === '/disclaimer') {
    require __DIR__ . '/disclaimer.php';
} else {
    // 404
    http_response_code(404);
    echo "404 Not Found";
}
