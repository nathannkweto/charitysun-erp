import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeMode } from './themes';

interface ThemeContextValue {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'charitysun-theme-preference';

export const ThemeModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize theme from localStorage or default to 'light'
    const [mode, setModeState] = useState<ThemeMode>(() => {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        return (stored as ThemeMode) || 'light';
    });

    // Persist theme changes to localStorage
    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, mode);
    }, [mode]);

    const setMode = (newMode: ThemeMode) => {
        setModeState(newMode);
    };

    const toggleTheme = () => {
        setModeState((current) => {
            // Cycle through: light -> dark -> night -> light
            if (current === 'light') return 'dark';
            if (current === 'dark') return 'night';
            return 'light';
        });
    };

    return (
        <ThemeContext.Provider value={{ mode, setMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeMode = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeMode must be used within ThemeModeProvider');
    }
    return context;
};
