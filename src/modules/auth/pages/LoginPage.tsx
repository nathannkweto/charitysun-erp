import React from 'react';
import { Box, Grid, Typography, alpha } from '@mui/material';
import LoginForm from '../components/LoginForm';
import authBg from '../../../assets/auth-bg.jpg';

const LoginPage: React.FC = () => {
    return (
        <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
            {/* Left Side: Visual/Branding */}
            <Grid
                size={{ xs: 0, sm: 4, md: 7 }}
                sx={{
                    position: 'relative',
                    backgroundImage: `url(${authBg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: { xs: 'none', sm: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 6,
                }}
            >
                {/* Overlay for better text readability */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(to top, ${alpha('#0F172A', 0.9)} 0%, ${alpha('#0F172A', 0.2)} 100%)`,
                        zIndex: 1
                    }}
                />

                <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 600 }}>
                    <Typography
                        variant="h1"
                        color="white"
                        sx={{
                            fontSize: { md: '3.5rem', lg: '4.5rem' },
                            fontWeight: 800,
                            lineHeight: 1.1,
                            mb: 2
                        }}
                    >
                        Precision Engineering <br />
                        <span style={{ color: '#3B82F6' }}>Redefined.</span>
                    </Typography>
                    <Typography
                        variant="h6"
                        color="grey.400"
                        sx={{ fontWeight: 400, maxWidth: 500 }}
                    >
                        Experience the next generation of Automobile & Mechanical ERP systems.
                        Streamline your workflow with Charitysun Engineering.
                    </Typography>
                </Box>
            </Grid>

            {/* Right Side: Authentication form */}
            <Grid
                size={{ xs: 12, sm: 8, md: 5 }}
                component={Box}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.paper',
                    p: 4,
                    height: '100%'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: 450
                    }}
                >
                    {/* Logo */}
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            bgcolor: 'primary.main',
                            borderRadius: 2,
                            mb: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '1.5rem',
                            boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.4)'
                        }}
                    >
                        CE
                    </Box>

                    <LoginForm />
                </Box>

                <Box sx={{ mt: 'auto', pt: 4 }}>
                    <Typography variant="caption" color="text.secondary">
                        &copy; 2026 Charitysun Engineering. All rights reserved.
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginPage;