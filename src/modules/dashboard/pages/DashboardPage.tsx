import React from 'react';
import { Box, Typography, Grid, Paper, Button, Stack, alpha, Container } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import heroBg from '@/assets/hero-bg.jpg';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <Paper sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', gap: 2, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 20px -5px rgba(0,0,0,0.1)' } }}>
        <Box sx={{ color: 'secondary.main' }}>{icon}</Box>
        <Typography variant="h6" fontWeight={700}>{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{description}</Typography>
    </Paper>
);

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    return (
        <Box>
            {/* Hero Section */}
            <Box sx={{
                mb: 8,
                borderRadius: 4,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '500px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                backgroundImage: `url(${heroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(to right, ${alpha('#0F172A', 0.95)} 0%, ${alpha('#0F172A', 0.6)} 50%, ${alpha('#0F172A', 0.2)} 100%)`,
                        zIndex: 1
                    }}
                />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 8 }}>
                    <Stack spacing={3} sx={{ maxWidth: 700 }}>
                        <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, lineHeight: 1.1 }}>
                            {isAuthenticated ? `Systems Online, ${user?.name}` : 'Precision Engineering ERP'}
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 400, opacity: 0.9, lineHeight: 1.5 }}>
                            {isAuthenticated
                                ? 'Your operations dashboard is ready. Monitor real-time telemetry and manage industrial assets with core systems.'
                                : 'Master your industrial operations with the most advanced mechanical and automobile engineering ERP. Built for accuracy, driven by precision.'}
                        </Typography>
                        {!isAuthenticated && (
                            <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => navigate('/login')}
                                    sx={{ py: 2, px: 6, fontSize: '1.1rem' }}
                                >
                                    Access Platform
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white', bgcolor: alpha('#fff', 0.1) } }}
                                    size="large"
                                    onClick={() => navigate('/services')}
                                >
                                    Explore Services
                                </Button>
                            </Stack>
                        )}
                    </Stack>
                </Container>
            </Box>

            {/* Feature Highlights */}
            <Container maxWidth="lg">
                <Typography variant="h4" fontWeight={800} sx={{ mb: 6, textAlign: 'center' }}>
                    Engineered for Performance
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <FeatureCard
                            icon={<EngineeringIcon fontSize="large" />}
                            title="Asset Management"
                            description="Track every component and machine with serial-level detail and history."
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FeatureCard
                            icon={<SpeedIcon fontSize="large" />}
                            title="Real-time Telemetry"
                            description="Monitor production throughput and supply chain speed with sub-second updates."
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FeatureCard
                            icon={<SecurityIcon fontSize="large" />}
                            title="Hardened Security"
                            description="Military-grade encryption and granular RBAC to protect your industrial secrets."
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FeatureCard
                            icon={<TrendingUpIcon fontSize="large" />}
                            title="Predictive Scaling"
                            description="AI-driven insights to forecast maintenance and scale operations efficiently."
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default DashboardPage;
