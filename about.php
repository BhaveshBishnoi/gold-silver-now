<?php
$pageTitle = "About Us - Gold Silver Now";
$pageDesc = "Learn about Gold Silver Now, our mission to democratize financial market data, and our team.";
$page = 'about';
include_once __DIR__ . '/includes/header.php';
?>

<!-- Main Content -->
<section class="container" style="padding: 4rem 2rem; min-height: 60vh;">
    <h1 style="margin-bottom: 2rem;">About Gold Silver Now</h1>
    <div style="background: var(--card-bg); padding: 2rem; border-radius: 1rem; border: 1px solid rgba(255,255,255,0.05);">
        <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
            Welcome to <strong>Gold Silver Now</strong> (goldsilvernow.in), a leading digital platform dedicated to providing real-time precious metals market data. 
            We are committed to delivering accurate live price updates for Gold and Silver to investors, jewellers, and market enthusiasts across India and the globe.
        </p>
        
        <h3 style="margin-bottom: 1rem; color: var(--text-primary);">Our Mission</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
            Our mission is to simplify access to financial data. In a volatile market, timely information is key. We strive to provide a fast, reliable, and user-friendly 
            interface that helps our users monitor market trends effectively. Whether you are tracking the spot price for trading or checking rates for purchasing jewelry, 
            Gold Silver Now is your trusted companion.
        </p>
        
        <h3 style="margin-bottom: 1rem; color: var(--text-primary);">Data Sources & Reliability</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
            We aggregate data from reputable international market data providers (such as Metals-API and GoldAPI). Our systems automatically update prices 
            at frequent intervals to ensure the data displayed reflects the current market status as closely as possible.
        </p>

        <div style="border-left: 4px solid var(--gold-primary); padding-left: 1rem; margin-top: 2rem;">
            <p style="color: var(--text-secondary); font-size: 0.9rem;">
                <em><strong>Note:</strong> While we aim for accuracy, Gold Silver Now is an informational platform. We are not a registered financial advisor or broker. 
                Please consult with a certified financial planner before making any high-value investment decisions.</em>
            </p>
        </div>
    </div>
</section>

<?php include_once __DIR__ . '/includes/footer.php'; ?>