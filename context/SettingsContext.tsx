'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Currency = 'INR' | 'USD' | 'EUR';
type Unit = 1 | 10 | 100 | 1000;

interface SettingsContextType {
    currency: Currency;
    setCurrency: (c: Currency) => void;
    unit: Unit;
    setUnit: (u: Unit) => void;
    exchangeRates: Record<Currency, { rate: number; symbol: string }>;
}

const defaultExchangeRates = {
    USD: { rate: 1, symbol: '$' },
    INR: { rate: 84.50, symbol: '₹' },
    EUR: { rate: 0.92, symbol: '€' },
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrency] = useState<Currency>('INR');
    const [unit, setUnit] = useState<Unit>(10);

    return (
        <SettingsContext.Provider
            value={{
                currency,
                setCurrency,
                unit,
                setUnit,
                exchangeRates: defaultExchangeRates,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
