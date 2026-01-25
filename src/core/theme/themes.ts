import { createTheme, Theme } from '@mui/material/styles';
import { lightPalette, darkPalette, nightPalette } from './palettes';

const commonThemeOptions = {
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 900,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 800,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontWeight: 700,
        },
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none' as const,
                    fontWeight: 600,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
    transitions: {
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
        },
    },
};

export const lightTheme: Theme = createTheme({
    ...commonThemeOptions,
    palette: lightPalette,
});

export const darkTheme: Theme = createTheme({
    ...commonThemeOptions,
    palette: darkPalette,
});

export const nightTheme: Theme = createTheme({
    ...commonThemeOptions,
    palette: nightPalette,
});

export type ThemeMode = 'light' | 'dark' | 'night';

export const themes = {
    light: lightTheme,
    dark: darkTheme,
    night: nightTheme,
};
