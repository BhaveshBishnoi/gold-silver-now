document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const goldPriceEl = document.getElementById('gold-price');
    const goldChangeEl = document.getElementById('gold-change');
    const goldTimeEl = document.getElementById('gold-time');
    const silverPriceEl = document.getElementById('silver-price');
    const silverChangeEl = document.getElementById('silver-change');
    const silverTimeEl = document.getElementById('silver-time');
    const newsGrid = document.getElementById('news-grid');
    const currencySelect = document.getElementById('currencySelect');

    // State
    let currentCurrency = 'INR';
    let latestData = null;
    let currentUnit = 10; // Default to 10g for Tola
    let goldChart, silverChart, goldSparkline, silverSparkline;

    // Exchange Rates (Mock/Static for demo purposes)
    const exchangeRates = {
        USD: { rate: 1, symbol: '$' },
        INR: { rate: 84.50, symbol: '₹' },
        EUR: { rate: 0.92, symbol: '€' }
    };

    // Helper: Convert Price
    function convertPrice(price) {
        const currency = exchangeRates[currentCurrency];
        return (price * currency.rate);
    }

    // Helper: Format Price
    function formatPrice(price) {
        const currency = exchangeRates[currentCurrency];
        return `${currency.symbol}${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // Event Listener for Currency
    if (currencySelect) {
        currencySelect.addEventListener('change', (e) => {
            currentCurrency = e.target.value;
            if (latestData) {
                updateDashboard(latestData);
                updateCharts(latestData);
            }
        });
    }

    // Event Listener for Unit
    const unitSelect = document.getElementById('weightUnit');
    if (unitSelect) {
        unitSelect.addEventListener('change', (e) => {
            currentUnit = parseFloat(e.target.value);
            if (latestData) {
                updateDashboard(latestData);
                // updateDetailedRates(latestData.data.gold, latestData.data.silver); // Covered by updateDashboard
            }
        });
    }

    // Fetch Prices
    async function fetchPrices() {
        try {
            const response = await fetch('api/get-prices.php');
            const data = await response.json();

            latestData = data;
            updateDashboard(data);
            updateCharts(data);

        } catch (error) {
            console.error('Error fetching prices:', error);
            if (goldPriceEl) goldPriceEl.textContent = 'Error';
            if (silverPriceEl) silverPriceEl.textContent = 'Error';
        }
    }

    // Update Dashboard UI
    function updateDashboard(data) {
        if (!data || !data.data) return;

        const gold = data.data.gold;
        const silver = data.data.silver;
        const timestamp = new Date(data.timestamp * 1000).toLocaleTimeString();

        // Update Gold
        if (goldPriceEl) goldPriceEl.textContent = formatPrice(convertPrice(gold.price));
        if (goldChangeEl) updateChangeIndicator(goldChangeEl, gold.change_percent);
        if (goldTimeEl) goldTimeEl.textContent = `Updated: ${timestamp}`;

        // Update Silver
        if (silverPriceEl) silverPriceEl.textContent = formatPrice(convertPrice(silver.price));
        if (silverChangeEl) updateChangeIndicator(silverChangeEl, silver.change_percent);
        if (silverTimeEl) silverTimeEl.textContent = `Updated: ${timestamp}`;

        // Update Detailed Rates Table
        updateDetailedRates(gold, silver);
    }

    function updateDetailedRates(gold, silver) {
        // Gold Rates (Gram)
        // API gives price per ounce (approx 31.1035g)
        // Check if API gives gram details in 'details' field
        const ozToGram = 31.1034768;

        let gPrice24k, gPrice22k, gPrice21k, gPrice18k;

        if (gold.details && gold.details.price_gram_24k) {
            // API Provided Gram prices (Base USD)
            gPrice24k = gold.details.price_gram_24k;
            gPrice22k = gold.details.price_gram_22k;
            gPrice21k = gold.details.price_gram_21k;
            gPrice18k = gold.details.price_gram_18k;
        } else {
            // Fallback Calculation
            const baseGramPrice = gold.price / ozToGram;
            gPrice24k = baseGramPrice; // 99.9%
            gPrice22k = baseGramPrice * 0.916;
            gPrice21k = baseGramPrice * 0.875;
            gPrice18k = baseGramPrice * 0.750;
        }

        // Render Gold Table
        const g24El = document.getElementById('g-24k');
        const g22El = document.getElementById('g-22k');
        const g21El = document.getElementById('g-21k');
        const g18El = document.getElementById('g-18k');

        if (g24El) g24El.textContent = formatPrice(convertPrice(gPrice24k));
        if (g22El) g22El.textContent = formatPrice(convertPrice(gPrice22k));
        if (g21El) g21El.textContent = formatPrice(convertPrice(gPrice21k));
        if (g18El) g18El.textContent = formatPrice(convertPrice(gPrice18k));

        // Silver Rates (Kg / Gram) (API often gives gram prices too)
        let sPriceFine, sPriceSterling;

        if (silver.details && silver.details.price_gram_24k) {
            // 24k silver = Fine Silver
            sPriceFine = silver.details.price_gram_24k * 1000; // Per KG usually requested
            sPriceSterling = sPriceFine * 0.925;
        } else {
            const baseSilverGram = silver.price / ozToGram;
            sPriceFine = baseSilverGram * 1000; // KG
            sPriceSterling = sPriceFine * 0.925;
        }

        const sFineEl = document.getElementById('s-fine');
        const sSterlingEl = document.getElementById('s-sterling');

        // Update header currency label to match
        const currencySym = exchangeRates[currentCurrency].symbol;
        const gHeaderLabel = document.querySelector('.gold-header .currency-label');
        const sHeaderLabel = document.querySelector('.silver-header .currency-label');

        if (gHeaderLabel) gHeaderLabel.textContent = `${currentCurrency}/g`;
        if (sHeaderLabel) sHeaderLabel.textContent = `${currentCurrency}/kg`;

        if (sFineEl) sFineEl.textContent = formatPrice(convertPrice(sPriceFine));
        if (sSterlingEl) sSterlingEl.textContent = formatPrice(convertPrice(sPriceSterling));
    }

    function updateChangeIndicator(element, change) {
        const isPositive = change >= 0;
        element.textContent = `${isPositive ? '+' : ''}${change}%`;
        element.style.color = isPositive ? 'var(--success)' : 'var(--danger)';
    }

    // Initialize & Update Charts
    function updateCharts(data) {
        if (!data || !data.data || !data.data.history) return;

        const history = data.data.history;
        const labels = history.map(item => new Date(item.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

        // Convert history data
        const goldData = history.map(item => convertPrice(item.gold));
        const silverData = history.map(item => convertPrice(item.silver));

        const currencySymbol = exchangeRates[currentCurrency].symbol;

        // Sparklines
        if (goldSparkline) goldSparkline.destroy();
        goldSparkline = createSparkline('goldSparkline', goldData, '#fbbf24', '#fbbf2433');

        if (silverSparkline) silverSparkline.destroy();
        silverSparkline = createSparkline('silverSparkline', silverData, '#e2e8f0', '#e2e8f033');

        // Main Charts
        if (goldChart) goldChart.destroy();
        goldChart = createMainChart('mainGoldChart', labels, goldData, `Gold Price (${currentCurrency})`, '#fbbf24');

        if (silverChart) silverChart.destroy();
        silverChart = createMainChart('mainSilverChart', labels, silverData, `Silver Price (${currentCurrency})`, '#e2e8f0');
    }

    function createSparkline(canvasId, data, color, bgColor) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        return new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: data.map((_, i) => i),
                datasets: [{
                    data: data,
                    borderColor: color,
                    backgroundColor: bgColor,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
            }
        });
    }

    function createMainChart(canvasId, labels, data, label, color) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const context = ctx.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color + '80');
        gradient.addColorStop(1, color + '00');

        return new Chart(context, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    borderColor: color,
                    backgroundColor: gradient,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 6,
                    pointBackgroundColor: color
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        titleColor: '#f8fafc',
                        bodyColor: '#cbd5e1',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += exchangeRates[currentCurrency].symbol + context.parsed.y.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#64748b' }
                    },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#64748b' }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    // Fetch News
    async function fetchNews() {
        try {
            const response = await fetch('api/get-news.php');
            const newsItems = await response.json();

            if (newsGrid) renderNews(newsItems);
        } catch (error) {
            console.error('Error fetching news:', error);
            if (newsGrid) newsGrid.innerHTML = '<p>Latest news currently unavailable.</p>';
        }
    }

    function renderNews(newsItems) {
        if (!newsGrid) return;
        newsGrid.innerHTML = '';
        newsItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'news-card';

            const date = new Date(item.published_at).toLocaleDateString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            card.innerHTML = `
                <div class="news-thumbnail" style="background-image: url('${item.image || 'assets/img/news-placeholder.jpg'}')"></div>
                <div class="news-content">
                    <h3 class="news-title">${item.title}</h3>
                    <p class="news-excerpt">${item.description}</p>
                    <div class="news-meta">
                        <span>${date}</span>
                        <a href="${item.url}" target="_blank" class="read-more">Read More <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
            newsGrid.appendChild(card);
        });
    }

    // Initial Load
    fetchPrices();
    fetchNews();

    // Auto Refresh (10 minutes)
    setInterval(fetchPrices, 600000);

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
                navLinks.style.padding = '1rem';
                navLinks.style.zIndex = '1000';
            }
        });
    }
});
