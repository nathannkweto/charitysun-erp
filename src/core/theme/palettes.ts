export const lightPalette = {
    mode: 'light' as const,
    primary: {
        main: '#3B82F6',
        light: '#60A5FA',
        dark: '#2563EB',
        contrastText: '#FFFFFF',
    },
    secondary: {
        main: '#3B82F6',
        light: '#60A5FA',
        dark: '#2563EB',
        contrastText: '#FFFFFF',
    },
    background: {
        default: '#FFFFFF',
        paper: '#F9FAFB',
    },
    text: {
        primary: '#0F172A',
        secondary: '#64748B',
    },
    divider: '#E5E7EB',
};

export const darkPalette = {
    mode: 'dark' as const,
    primary: {
        main: '#60A5FA',
        light: '#93C5FD',
        dark: '#3B82F6',
        contrastText: '#0F172A',
    },
    secondary: {
        main: '#60A5FA',
        light: '#93C5FD',
        dark: '#3B82F6',
        contrastText: '#0F172A',
    },
    background: {
        default: '#0F172A',
        paper: '#1E293B',
    },
    text: {
        primary: '#FFFFFF',
        secondary: '#E2E8F0',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
};

export const nightPalette = {
    mode: 'light' as const, // Use light mode as base for proper component rendering
    primary: {
        main: '#F59E0B',
        light: '#FBBF24',
        dark: '#D97706',
        contrastText: '#4A3728',
    },
    secondary: {
        main: '#F59E0B',
        light: '#FBBF24',
        dark: '#D97706',
        contrastText: '#4A3728',
    },
    background: {
        default: '#FFF8F0',
        paper: '#FFF5E8',
    },
    text: {
        primary: '#4A3728',
        secondary: '#6B5D52',
    },
    divider: '#E5D5C0',
};
