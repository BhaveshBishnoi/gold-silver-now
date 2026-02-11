<?php
// Configuration for API Keys
// Replace with your actual API keys

return [
    'METALS_API_KEY' => getenv('METALS_API_KEY') ?: 'goldapi-402f6smlhyqjtm-io', // User provided key
    'NEWS_API_KEY' => getenv('NEWS_API_KEY') ?: 'YOUR_NEWS_API_KEY'
];
