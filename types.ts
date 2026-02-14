export interface CurrencyData {
    price: number;
    change_percent: number;
    details?: {
        price_gram_24k: number;
        price_gram_22k: number;
        price_gram_21k: number;
        price_gram_18k: number;
    };
}

export interface MetalData {
    INR: CurrencyData;
}

export interface HistoryItem {
    timestamp: number;
    gold: number;
    silver: number;
}

export interface PricesResponse {
    status: string;
    timestamp: number;
    data: {
        gold: MetalData;
        silver: MetalData;
        history: {
            INR: HistoryItem[];
        };
    };
}
