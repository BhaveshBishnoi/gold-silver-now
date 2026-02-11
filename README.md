# Gold Silver Now - Live Market Tracker (Next.js + MUI)

A modern, high-performance web application designed for tracking real-time Gold and Silver prices. Rebuilt with Next.js 14 (App Router) and Material UI for a premium, responsive user experience.

## 🚀 Key Features

*   **Real-Time Market Data**: Live streaming of Gold (XAU) and Silver (XAG) prices.
*   **Material Design UI**: A polished, professional interface using Material UI v5 with a custom Light Theme.
*   **Multi-Currency**: Instantly convert prices between **INR (₹)**, **USD ($)**, and **EUR (€)**.
*   **Dynamic Unit Conversion**: View rates per **1g**, **10g**, **100g**, or **1kg**.
*   **Interactive Charts**: Responsive line charts with time range filtering (1D, 7D, 1M, 1Y).
*   **Sparklines**: Instant trend visualization on dashboard cards.
*   **Responsive**: Fully optimized for mobile, tablet, and desktop.
*   **SEO Optimized**: Server-Side Rendering (SSR) capabilities with Next.js.

## 🛠️ Technology Stack

*   **Framework**: Next.js 14 (App Router)
*   **UI Library**: Material UI (MUI) v5 + Emotion
*   **Language**: TypeScript
*   **Charts**: Chart.js + react-chartjs-2
*   **Icons**: MUI Icons + FontAwesome
*   **Fonts**: Google Fonts (Outfit & Inter) via `next/font`

## ⚙️ Installation & Setup

### Prerequisites
*   Node.js 18+ installed.

### Steps

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Configure API Keys**
    *   Create a `.env.local` file in the root.
    *   Add your GoldAPI key (optional, defaults to mock/fallback if missing or limit reached):
    ```env
    METALS_API_KEY=your_api_key_here
    ```

3.  **Run Locally**
    Start the development server:
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:3000`.

4.  **Build for Production**
    ```bash
    npm run build
    npm start
    ```

## 📂 Project Structure

```
/
├── app/                    # Next.js App Router
│   ├── api/                # API Routes (Proxy)
│   ├── layout.tsx          # Root Layout with Providers
│   └── page.tsx            # Homepage
├── components/             # React Components (MUI)
│   ├── Nav.tsx             # Navigation Bar
│   ├── Dashboard.tsx       # Live Price Cards
│   ├── RateTable.tsx       # Detailed Rates Table
│   ├── ChartsSection.tsx   # Interactive Charts
│   └── ...
├── context/                # React Context
│   └── SettingsContext.tsx # Currency & Unit State
├── theme/                  # MUI Theme Configuration
│   ├── theme.ts            # Palette & Typography
│   └── ThemeRegistry.tsx   # Emotion Cache Setup
├── types.ts                # TypeScript Interfaces
└── public/                 # Static Assets
```

## 📄 License

This project is licensed under the MIT License.
