import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0F172A', // Slate 900
            light: '#334155',
            dark: '#020617',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#3B82F6', // Blue 500
            light: '#60A5FA',
            dark: '#1D4ED8',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#F8FAFC', // Slate 50
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1E293B',
            secondary: '#64748B',
        },
        divider: alpha('#64748B', 0.1),
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shadows: [
        'none',
        '0px 1px 2px rgba(0, 0, 0, 0.05)',
        '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
        '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
        ...Array(20).fill('none'), // Fill remaining to match MUI expected shadow length
    ] as any,
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                    border: `1px solid ${alpha('#64748B', 0.1)}`,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: alpha('#FFFFFF', 0.8),
                    backdropFilter: 'blur(8px)',
                    color: '#1E293B',
                    boxShadow: 'none',
                    borderBottom: `1px solid ${alpha('#64748B', 0.1)}`,
                },
            },
        },
    },
});

export default theme;

