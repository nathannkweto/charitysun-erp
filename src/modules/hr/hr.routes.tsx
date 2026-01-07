import { createTheme } from '@mui/material/styles';

// 1. Define Brand Colors
const primaryColor = '#1565C0'; // Deep Blue
const secondaryColor = '#ED6C02'; // Warm Orange (good for "Donate" or "Action" buttons)
const backgroundColor = '#F4F6F8'; // Light Grey (easier on eyes than pure white)

export const theme = createTheme({
    palette: {
        mode: 'light', // We can toggle this to 'dark' later
        primary: {
            main: primaryColor,
            light: '#5E92F3',
            dark: '#003C8F',
            contrastText: '#ffffff',
        },
        secondary: {
            main: secondaryColor,
            contrastText: '#ffffff',
        },
        background: {
            default: backgroundColor,
            paper: '#ffffff',
        },
        text: {
            primary: '#2B3445', // Dark grey, softer than pure black
            secondary: '#7D879C',
        },
        error: {
            main: '#D32F2F',
        },
        success: {
            main: '#2E7D32',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Inter", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700, fontSize: '2.5rem' },
        h2: { fontWeight: 600, fontSize: '2rem' },
        h3: { fontWeight: 600, fontSize: '1.75rem' },
        h4: { fontWeight: 600, fontSize: '1.5rem' },
        h5: { fontWeight: 500, fontSize: '1.25rem' },
        h6: { fontWeight: 500, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: 0.5 },
        button: {
            textTransform: 'none', // Stops buttons from being ALL CAPS
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8, // Slightly more rounded corners (Modern Standard)
    },
    components: {
        // 2. Override specific component styles globally
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: 'none', // Flatter, modern design
                    '&:hover': {
                        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                    },
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#0D47A1',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none', // Remove weird overlay in dark mode
                },
                rounded: {
                    borderRadius: 12, // Cards look softer
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small', // Compact inputs are better for dense ERP forms
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.05)', // Soft shadow
                    border: '1px solid rgba(0,0,0,0.05)',
                },
            },
        },
    },
});