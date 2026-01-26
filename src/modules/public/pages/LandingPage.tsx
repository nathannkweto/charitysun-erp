import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import heroBg from '../../../assets/hero-bg.jpg';

import { ServiceSection } from '../components/ServiceSection';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100vh' }}>
            {/* Cinematic Hero */}
            <Box sx={{
                position: 'relative',
                height: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                backgroundImage: `url(${heroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>

                {/* Visual Overlay */}
                <Box sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                    zIndex: 1
                }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ maxWidth: 700 }}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                                fontWeight: 900,
                                color: '#FFFFFF',
                                lineHeight: 0.9,
                                mb: 3,
                                letterSpacing: '-0.03em'
                            }}
                        >
                            PRECISION <br />
                            WITHOUT COMPROMISE.
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 6, color: '#FFFFFF', opacity: 0.9, fontWeight: 400, fontSize: { xs: '1.2rem', md: '1.5rem' }, maxWidth: 500 }}>
                            Explore the next generation of Charitysun Engineering and Automobile solutions.
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                sx={{ borderRadius: 0, px: 6, py: 2, fontWeight: 800, fontSize: '1rem' }}
                                onClick={() => navigate('/login')}
                            >
                                ENTER PLATFORM
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{ borderRadius: 0, px: 6, py: 2, fontWeight: 800, fontSize: '1rem', color: '#FFFFFF', borderColor: '#FFFFFF', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: '#FFFFFF' } }}
                                onClick={() => navigate('/services')}
                            >
                                EXPLORE SERVICES
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Box>

            {/* Editorial Service Sections */}
            <ServiceSection
                subtitle="MECHANICAL EXCELLENCE"
                title="Industrial Power for Tomorrow."
                image={heroBg}
            >

                <Typography variant="body1" sx={{ color: '#64748B', fontSize: '1.1rem', mb: 4, lineHeight: 1.8 }}>
                    Our mechanical engineering division provides world-class solutions for industrial automation, energy systems, and high-precision manufacturing. Built to endure, designed to perform.
                </Typography>
            </ServiceSection>

            <ServiceSection
                subtitle="AUTOMOTIVE INNOVATION"
                title="The Drive to Excel."
                image={heroBg}
                reverse
            >

                <Typography variant="body1" sx={{ color: '#64748B', fontSize: '1.1rem', mb: 4, lineHeight: 1.8 }}>
                    Charitysun's automotive technologies redefine maintenance and performance tracking. Experience a unified system designed for modern fleet management and high-performance vehicle engineering.
                </Typography>
            </ServiceSection>

            <ServiceSection
                subtitle="DIGITAL ECOSYSTEM"
                title="One Platform. Total Growth."
                image={heroBg}
            >

                <Typography variant="body1" sx={{ color: '#64748B', fontSize: '1.1rem', mb: 4, lineHeight: 1.8 }}>
                    Our proprietary ERP platform integrates real-time telemetry with administrative controls, providing engineers with the data they need to scale with confidence.
                </Typography>
            </ServiceSection>

        </Box>
    );
};

export default LandingPage;