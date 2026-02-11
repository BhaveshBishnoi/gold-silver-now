<?php
// Determine current page for active class
$page = basename($_SERVER['PHP_SELF'], ".php");
if ($page == "index") $page = "home";

// Default Meta (Fallback)
$metaTitle = isset($pageTitle) ? $pageTitle . " - Gold Silver Now" : "Gold Silver Now - Live Market Prices";
$metaDesc = isset($pageDesc) ? $pageDesc : "Live Gold & Silver Price Tracker with real-time charts and market news.";

// Base URL for consistent linking
$baseUrl = ''; 
// In production or local dev, ensure this points correctly. 
// For now, relative paths or clean URLs work if routed correctly.
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="<?php echo $metaDesc; ?>">
    <title><?php echo $metaTitle; ?></title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    
    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Styles -->
    <link rel="stylesheet" href="assets/css/style.css">
    
    <!-- Chart.js (Only load on charts/home page if needed for performance, but small enough to keep global) -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>

    <!-- Navigation -->
    <nav class="navbar">
        <div class="container nav-content">
            <a href="/" class="logo">
                <i class="fa-solid fa-coins"></i> Gold Silver <span class="highlight">Now</span>
            </a>
            <div class="nav-right">
                <ul class="nav-links">
                    <li><a href="/" class="<?php echo ($page == 'home') ? 'active' : ''; ?>">Home</a></li>
                    <li><a href="/#charts">Charts</a></li>
                    <li><a href="/#news">News</a></li>
                    <li><a href="/about" class="<?php echo ($page == 'about') ? 'active' : ''; ?>">About Us</a></li>
                    <li><a href="/contact" class="<?php echo ($page == 'contact') ? 'active' : ''; ?>">Contact Us</a></li>
                </ul>
                <div class="currency-selector">
                    <select id="currencySelect" aria-label="Select Currency">
                        <option value="USD">USD ($)</option>
                        <option value="INR" selected>INR (₹)</option>
                        <option value="EUR">EUR (€)</option>
                    </select>
                </div>
                <div class="mobile-menu-btn" aria-label="Toggle navigation">
                    <i class="fa-solid fa-bars"></i>
                </div>
            </div>
        </div>
    </nav>
