import { Box, Container, Stack, Typography, Link, Divider, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ bgcolor: '#0F172A', color: '#FFFFFF', py: { xs: 6, md: 10 }, mt: 'auto' }}>
            <Container maxWidth="lg">
                <Stack spacing={8}>
                    {/* Main Footer Content */}
                    <Grid container spacing={{ xs: 6, md: 4 }}>
                        {/* 1. Brand Section (Full width on mobile, Left side on desktop) */}
                        <Grid size={{ xs: 12, md: 5, lg: 6 }}>
                            <Box sx={{ maxWidth: 400 }}>
                                <Typography variant="h5" fontWeight={900} sx={{ mb: 3, letterSpacing: '-0.05em' }}>
                                    CHARITYSUN
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.7, lineHeight: 1.8 }}>
                                    Leading the way in precision mechanical engineering and innovative automobile solutions.
                                </Typography>
                            </Box>
                        </Grid>

                        {/* 2. Links Section (Side-by-side on mobile, Right side on desktop) */}
                        <Grid size={{ xs: 12, md: 7, lg: 6 }}>
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 6, sm: 4 }}>
                                    <Stack spacing={2}>
                                        <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1, color: 'secondary.main' }}>
                                            COMPANY
                                        </Typography>
                                        {['About Us', 'Projects', 'Contact'].map((item) => (
                                            <Link
                                                key={item}
                                                onClick={() => navigate(`/${item.toLowerCase().replace(' ', '')}`)}
                                                color="inherit"
                                                sx={{
                                                    opacity: 0.6,
                                                    fontSize: '0.875rem',
                                                    cursor: 'pointer',
                                                    textDecoration: 'none',
                                                    transition: 'opacity 0.2s',
                                                    '&:hover': { opacity: 1, color: 'secondary.main' }
                                                }}
                                            >
                                                {item}
                                            </Link>
                                        ))}
                                    </Stack>
                                </Grid>

                                <Grid size={{ xs: 6, sm: 4 }}>
                                    <Stack spacing={2}>
                                        <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1, color: 'secondary.main' }}>
                                            SERVICES
                                        </Typography>
                                        {['Mechanical', 'Automotive', 'Digital ERP'].map((item) => (
                                            <Typography key={item} variant="body2" sx={{ opacity: 0.6, fontSize: '0.875rem' }}>
                                                {item}
                                            </Typography>
                                        ))}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

                    {/* Bottom Bar */}
                    <Stack
                        direction={{ xs: 'column-reverse', md: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'center', md: 'center' }}
                        spacing={{ xs: 2, md: 0 }}
                        sx={{ opacity: 0.4, textAlign: { xs: 'center', md: 'left' } }}
                    >
                        <Typography variant="caption">
                            &copy; 2026 Charitysun Engineering. All rights reserved.
                        </Typography>
                        <Stack direction="row" spacing={4}>
                            <Link href="#" color="inherit" underline="hover" sx={{ fontSize: '0.75rem' }}>Privacy Policy</Link>
                            <Link href="#" color="inherit" underline="hover" sx={{ fontSize: '0.75rem' }}>Terms of Use</Link>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};