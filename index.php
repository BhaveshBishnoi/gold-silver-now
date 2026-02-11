<?php
$pageTitle = "Gold Silver Now - Live Market Prices";
$pageDesc = "Track real-time Gold (XAU) and Silver (XAG) prices with live charts, news, and market insights.";
$page = 'home';
include_once __DIR__ . '/includes/header.php';
?>

<!-- Hero Section -->
<header class="hero">
    <div class="container hero-content">
        <h1>Live Gold & Silver <span class="gradient-text">Market Prices</span></h1>
        <p class="subtitle"><span class="live-indicator"></span> Real-time data from global markets</p>
    </div>
    <div class="hero-bg-glow"></div>
</header>

<!-- Price Dashboard -->
<section class="dashboard container" id="dashboard">
    <!-- Gold Card -->
    <div class="price-card gold-card">
        <div class="card-header">
            <h3><i class="fa-solid fa-ring"></i> Gold (XAU)</h3>
            <span class="badge">Live</span>
        </div>
        <div class="price-display">
            <span class="currency"></span>
            <span class="price-value" id="gold-price">Loading...</span>
        </div>
        <div class="price-meta">
            <span class="change" id="gold-change">--%</span>
            <span class="timestamp" id="gold-time">Updated: --</span>
        </div>
        <div class="mini-chart-container">
            <canvas id="goldSparkline"></canvas>
        </div>
    </div>

    <!-- Silver Card -->
    <div class="price-card silver-card">
        <div class="card-header">
            <h3><i class="fa-solid fa-bars"></i> Silver (XAG)</h3>
            <span class="badge">Live</span>
        </div>
        <div class="price-display">
            <span class="currency"></span>
            <span class="price-value" id="silver-price">Loading...</span>
        </div>
        <div class="price-meta">
            <span class="change" id="silver-change">--%</span>
            <span class="timestamp" id="silver-time">Updated: --</span>
        </div>
        <div class="mini-chart-container">
            <canvas id="silverSparkline"></canvas>
        </div>
    </div>
</section>

<!-- Live Rates Table -->
<section class="container" id="rates">
    <div class="section-header" style="justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <h2>Live Metal Rates</h2>
        <div class="rate-controls">
            <select id="weightUnit" class="unit-select" style="padding: 0.5rem; border-radius: 0.5rem; background: var(--secondary-bg); color: var(--text-primary); border: 1px solid rgba(255,255,255,0.1);">
                <option value="1">Per Gram (1g)</option>
                <option value="10" selected>Per 10 Grams (Tola)</option>
                <option value="100">Per 100 Grams</option>
                <option value="1000">Per KG (1000g)</option>
            </select>
        </div>
    </div>
    <div class="rates-grid">
        <div class="rate-card">
            <div class="rate-header gold-header">
                <h3>Gold Rates</h3>
                <span class="currency-label" id="gold-unit-label">USD/10g</span>
            </div>
            <div class="rate-table-wrapper">
                <table class="rate-table">
                    <thead>
                        <tr>
                            <th>Purity</th>
                            <th id="gold-price-header">Price</th>
                        </tr>
                    </thead>
                    <tbody id="gold-rates-body">
                        <tr><td>24K (99.9%)</td><td id="g-24k">Loading...</td></tr>
                        <tr><td>22K (91.6%)</td><td id="g-22k">Loading...</td></tr>
                        <tr><td>21K (87.5%)</td><td id="g-21k">Loading...</td></tr>
                        <tr><td>18K (75.0%)</td><td id="g-18k">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="rate-card">
            <div class="rate-header silver-header">
                <h3>Silver Rates</h3>
                <span class="currency-label" id="silver-unit-label">USD/10g</span>
            </div>
            <div class="rate-table-wrapper">
                <table class="rate-table">
                    <thead>
                        <tr>
                            <th>Purity</th>
                            <th id="silver-price-header">Price</th>
                        </tr>
                    </thead>
                    <tbody id="silver-rates-body">
                        <tr><td>Fine Silver (99.9%)</td><td id="s-fine">Loading...</td></tr>
                        <tr><td>Sterling (92.5%)</td><td id="s-sterling">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<!-- Detailed Charts -->
<section class="charts-section container" id="charts">
    <div class="section-header">
        <h2>Market Trends</h2>
        <div class="chart-controls">
            <button class="time-btn active" data-time="1D">1D</button>
            <button class="time-btn" data-time="7D">7D</button>
            <button class="time-btn" data-time="1M">1M</button>
            <button class="time-btn" data-time="1Y">1Y</button>
        </div>
    </div>
    
    <div class="charts-grid">
        <div class="main-chart-card">
            <div class="chart-header">
                <h3>Gold Performance</h3>
            </div>
            <div class="chart-container">
                <canvas id="mainGoldChart"></canvas>
            </div>
        </div>
        <div class="main-chart-card">
            <div class="chart-header">
                <h3>Silver Performance</h3>
            </div>
            <div class="chart-container">
                <canvas id="mainSilverChart"></canvas>
            </div>
        </div>
    </div>
</section>

<!-- Detailed Information Section -->
<section class="container" id="info" style="padding: 4rem 2rem;">
    <div class="info-grid" style="display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
        <div class="info-card" style="background: var(--card-bg); padding: 2rem; border-radius: 1rem; border: 1px solid rgba(255,255,255,0.05);">
            <h3 style="color: var(--gold-primary); margin-bottom: 1rem;"><i class="fa-solid fa-scale-balanced"></i> About Gold Standards</h3>
            <p style="color: var(--text-secondary); line-height: 1.6;">
                Gold purity is measured in Karats (K). 24K gold is 99.9% pure and is primarily used for investment in the form of coins and bars. 
                22K gold (91.6% pure) is the standard for jewelry making as it is more durable. Understanding these differences helps in making informed buying decisions.
            </p>
        </div>
        
        <div class="info-card" style="background: var(--card-bg); padding: 2rem; border-radius: 1rem; border: 1px solid rgba(255,255,255,0.05);">
            <h3 style="color: var(--silver-primary); margin-bottom: 1rem;"><i class="fa-solid fa-industry"></i> Industrial Use of Silver</h3>
            <p style="color: var(--text-secondary); line-height: 1.6;">
                Unlike gold, silver has massive industrial applications including in electronics, solar panels, and medical instruments. 
                This industrial demand makes silver prices more volatile and responsive to global economic manufacturing data compared to gold.
            </p>
        </div>
        
        <div class="info-card" style="background: var(--card-bg); padding: 2rem; border-radius: 1rem; border: 1px solid rgba(255,255,255,0.05);">
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;"><i class="fa-solid fa-chart-line"></i> Why Track Live Prices?</h3>
            <p style="color: var(--text-secondary); line-height: 1.6;">
                Precious metal prices fluctuate throughout the day based on global market trading. Tracking live rates helps investors buy the dips 
                and sell at peaks. Our platform provides real-time data to ensure you never miss a market movement.
            </p>
        </div>
    </div>
</section>

<?php include_once __DIR__ . '/includes/footer.php'; ?>