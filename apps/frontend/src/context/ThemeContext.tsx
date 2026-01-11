'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig, defaultTheme } from '../types/theme';

interface ThemeContextType {
    theme: ThemeConfig;
    setTheme: (theme: ThemeConfig) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);

    // In a real implementation, we would fetch the tenant's theme configuration here
    // useEffect(() => {
    //   fetch('/api/tenant/theme').then(...)
    // }, []);

    // Apply CSS variables for dynamic styling
    useEffect(() => {
        const root = document.documentElement;

        // Colors
        root.style.setProperty('--c3-color-primary', theme.colors.primary);
        root.style.setProperty('--c3-color-secondary', theme.colors.secondary);
        root.style.setProperty('--c3-color-bg', theme.colors.background);
        root.style.setProperty('--c3-color-surface', theme.colors.surface);
        root.style.setProperty('--c3-color-text', theme.colors.text);
        root.style.setProperty('--c3-color-text-secondary', theme.colors.textSecondary);

        // Fonts
        root.style.setProperty('--c3-font-body', theme.fonts.body);
        root.style.setProperty('--c3-font-heading', theme.fonts.heading);

        // Radius
        root.style.setProperty('--c3-radius', theme.borderRadius);

    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
