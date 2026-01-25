import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import engineDetail from '@/assets/engine-detail.jpg';
import automotiveParts from '@/assets/automotive-parts.jpg';

const ServiceCard = ({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) => (
    <Paper
        elevation={0}
        sx={{
            p: 4,
            height: '100%',
            borderRadius: '2px',
            border: '1px solid #E5E7EB',
            transition: 'all 0.3s ease',
            '&:hover': {
                borderColor: 'secondary.main',
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
            },
        }}
    >
        <Box sx={{ color: 'secondary.main', mb: 3 }}>{icon}</Box>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
            {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {description}
        </Typography>
    </Paper>
);

const ServicesPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box>
            {/* Page Hero */}
            <Box
                sx={{
                    pt: { xs: 15, md: 20 },
                    pb: { xs: 8, md: 12 },
                    bgcolor: '#F9FAFB',
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="overline"
                        color="secondary"
                        fontWeight={800}
                        letterSpacing={2}
                        sx={{ mb: 2, display: 'block' }}
                    >
                        WHAT WE DO
                    </Typography>
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 900,
                            fontSize: { xs: '3rem', md: '5rem' },
                            mb: 3,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Engineering Excellence
                    </Typography>
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{ maxWidth: 700, lineHeight: 1.6 }}
                    >
                        From precision mechanical systems to cutting-edge automotive solutions,
                        Charitysun delivers world-class engineering across every discipline.
                    </Typography>
                </Container>
            </Box>

            {/* Service Cards */}
            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <ServiceCard
                            icon={<EngineeringIcon sx={{ fontSize: 48 }} />}
                            title="Mechanical Engineering"
                            description="Precision component manufacturing, industrial machinery design, and automation systems engineered for maximum reliability and performance."
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <ServiceCard
                            icon={<SettingsSuggestIcon sx={{ fontSize: 48 }} />}
                            title="Automotive Solutions"
                            description="Advanced automotive design, maintenance systems, and fleet management platforms optimized for modern transport requirements."
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <ServiceCard
                            icon={<PrecisionManufacturingIcon sx={{ fontSize: 48 }} />}
                            title="Digital ERP Platform"
                            description="Comprehensive ERP systems with real-time telemetry, administrative controls, and data-driven insights for scalable growth."
                        />
                    </Grid>
                </Grid>
            </Container>

            {/* Featured Service Sections */}
            <Box sx={{ bgcolor: '#FFFFFF', py: { xs: 8, md: 15 } }}>
                <Container maxWidth="lg">
                    <Grid container spacing={8} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                src={engineDetail}
                                sx={{
                                    width: '100%',
                                    height: '500px',
                                    objectFit: 'cover',
                                    borderRadius: '2px',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="overline" color="secondary" fontWeight={800} letterSpacing={2}>
                                MECHANICAL SYSTEMS
                            </Typography>
                            <Typography variant="h2" sx={{ fontWeight: 800, my: 3 }}>
                                Precision Manufacturing
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                                Our mechanical engineering division specializes in high-precision
                                manufacturing for industrial applications. From component design to
                                full-scale automation systems, we deliver solutions that meet the
                                highest standards of quality and reliability.
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => navigate('/contact')}
                            >
                                Get Started
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box sx={{ bgcolor: '#F9FAFB', py: { xs: 8, md: 15 } }}>
                <Container maxWidth="lg">
                    <Grid container spacing={8} alignItems="center" direction="row-reverse">
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                src={automotiveParts}
                                sx={{
                                    width: '100%',
                                    height: '500px',
                                    objectFit: 'cover',
                                    borderRadius: '2px',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="overline" color="secondary" fontWeight={800} letterSpacing={2}>
                                AUTOMOTIVE EXCELLENCE
                            </Typography>
                            <Typography variant="h2" sx={{ fontWeight: 800, my: 3 }}>
                                Next-Gen Solutions
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                                Our automotive division provides comprehensive solutions for fleet
                                management, maintenance tracking, and performance optimization. We
                                combine decades of automotive expertise with modern digital tools.
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => navigate('/contact')}
                            >
                                Learn More
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: { xs: 8, md: 12 } }}>
                <Container maxWidth="md">
                    <Stack spacing={4} alignItems="center" textAlign="center">
                        <Typography variant="h2" fontWeight={900}>
                            Ready to Start Your Project?
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600 }}>
                            Get in touch with our engineering team to discuss how we can help bring
                            your vision to life.
                        </Typography>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                borderRadius: 0,
                                px: 6,
                                py: 2,
                                fontWeight: 800,
                                color: 'white',
                                borderColor: 'white',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'white' },
                            }}
                            onClick={() => navigate('/contact')}
                        >
                            CONTACT US
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default ServicesPage;
