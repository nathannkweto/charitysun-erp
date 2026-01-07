import { createTheme } from '@mui/material/styles';

const primaryColor = '#0099ccff';
const secondaryColor = '#ff7600ff';
const backgroundColor = '#F4F6F8';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: primaryColor,
            light: primaryColor,
            dark: '#FFFFFF',
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
            primary: '#2B3445',
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
            textTransform: 'none',
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
                    borderRadius: 8,
                    boxShadow: 'none',
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
                    backgroundImage: 'none',
                },
                rounded: {
                    borderRadius: 12,
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.05)',
                },
            },
        },
    },
});