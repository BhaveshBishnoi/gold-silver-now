# Gold & Silver Live Price Website

A modern, responsive dashboard for tracking live Gold and Silver prices, featuring real-time charts and market news.

## Features
- **Live Prices**: Real-time updates for Gold (XAU) and Silver (XAG).
- **Interactive Charts**: Historical data visualization using Chart.js.
- **Market News**: curated news feed about precious metals.
- **Dark Mode UI**: Premium aesthetic with glassmorphism effects.
- **Mobile Responsive**: Fully optimized for all devices.

## Tech Stack
- **Frontend**: HTML5, CSS3 (Variables, Flexbox, Grid), JavaScript (ES6+).
- **Backend**: PHP (API Proxy & Caching).
- **Libraries**: Chart.js (CDN), FontAwesome (CDN), Google Fonts.

## Setup Instructions

### 1. Requirements
- PHP 7.4 or higher installed locally.
- Internet connection (for CDN assets and API fetching).

### 2. Configuration
1. Open `api/config.php`.
2. Enter your **Metals-API** and **NewsAPI** keys (optional).
   - If no keys are provided, the application defaults to **Mock Mode**, generating realistic simulated data for development.

### 3. Run Locally
Open a terminal in the project root and run:

```bash
php -S localhost:8000
```

Then open your browser to [http://localhost:8000](http://localhost:8000).

## Project Structure
```
/
├── index.html          # Main application interface
├── assets/
│   ├── css/            # Stylesheets
│   └── js/             # Frontend logic
├── api/
│   ├── get-prices.php  # JSON API for price data (includes caching)
│   ├── get-news.php    # JSON API for news data
│   ├── config.php      # API keys configuration
│   └── *.json          # Cached data files
└── README.md
```
# gold-silver-now
