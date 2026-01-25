import React, { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeModeProvider, useThemeMode } from './ThemeContext';
import { themes } from './themes';

const ThemeProviderInner: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { mode } = useThemeMode();
    const theme = themes[mode];

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeModeProvider>
            <ThemeProviderInner>{children}</ThemeProviderInner>
        </ThemeModeProvider>
    );
};
