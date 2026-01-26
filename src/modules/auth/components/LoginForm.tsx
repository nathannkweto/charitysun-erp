import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Checkbox,
    FormControlLabel,
    Link,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../../core/auth/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    // State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Auth State
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login({ email, password });
            navigate('/erp');
        } catch (err: any) {
            const msg = err.body?.message || "Invalid credentials. Please check your email and password.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1, color: 'primary.main' }}>
                Team Login
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Please enter your personal login details.
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                disabled={loading}
                autoFocus
            />
            <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={loading}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                edge="end"
                                disabled={loading}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 3 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            value="remember"
                            color="primary"
                            disabled={loading}
                            sx={{ borderRadius: 1 }}
                        />
                    }
                    label={<Typography variant="body2">Remember me</Typography>}
                />
                <Link href="#" variant="body2" fontWeight={600} underline="hover">
                    Forgot password?
                </Link>
            </Box>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                }}
            >
                {loading ? (
                    <CircularProgress size={24} color="inherit" />
                ) : (
                    'Sign In'
                )}
            </Button>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Don't have an account?{' '}
                    <Link href="#" fontWeight={600} underline="hover">
                        Contact Support
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginForm;