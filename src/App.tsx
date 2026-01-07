import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './core/theme';
import { AuthProvider } from './core/auth/AuthProvider';
import { AppRouter } from './core/AppRouter';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;