import { Box, Container, Stack, Typography, Link, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ bgcolor: '#0F172A', color: '#FFFFFF', py: 10, mt: 'auto' }}>
            <Container maxWidth="lg">
                <Stack spacing={8}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={8}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h5" fontWeight={900} sx={{ mb: 4, letterSpacing: '-0.05em' }}>
                                CHARITYSUN
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.7, maxWidth: 400 }}>
                                Leading the way in precision mechanical engineering and innovative automobile solutions.
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={8}>
                            <Stack spacing={2}>
                                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>COMPANY</Typography>
                                {['About Us', 'Projects', 'Contact'].map((item) => (
                                    <Link
                                        key={item}
                                        onClick={() => navigate(`/${item.toLowerCase().replace(' ', '')}`)}
                                        color="inherit"
                                        sx={{ opacity: 0.6, fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'none', '&:hover': { opacity: 1 } }}
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </Stack>

                            <Stack spacing={2}>
                                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>SERVICES</Typography>
                                {['Mechanical', 'Automotive', 'Digital ERP'].map((item) => (
                                    <Typography key={item} variant="body2" sx={{ opacity: 0.6, fontSize: '0.85rem' }}>
                                        {item}
                                    </Typography>
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" sx={{ opacity: 0.4 }}>
                        <Typography variant="caption">&copy; 2026 Charitysun Engineering. All rights reserved.</Typography>
                        <Stack direction="row" spacing={4}>
                            <Link href="#" color="inherit" sx={{ fontSize: '0.75rem' }}>Privacy Policy</Link>
                            <Link href="#" color="inherit" sx={{ fontSize: '0.75rem' }}>Terms of Use</Link>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};