import React from 'react';
import { Box, Typography, Container, Grid, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import engineDetail from '@/assets/engine-detail.jpg';
import automotiveParts from '@/assets/automotive-parts.jpg';

const HomePage: React.FC = () => {
    return (
        <Box>
            {/* Hero Section - Simple & Clean */}
            <Box
                sx={{
                    pt: { xs: 15, md: 20 },
                    pb: { xs: 8, md: 15 },
                    bgcolor: '#F9FAFB',
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 900,
                            fontSize: { xs: '3rem', md: '5rem' },
                            mb: 4,
                            letterSpacing: '-0.02em',
                            color: '#0F172A',
                        }}
                    >
                        Charitysun Engineering
                    </Typography>
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{ maxWidth: 700, lineHeight: 1.6, fontSize: { xs: '1.2rem', md: '1.4rem' } }}
                    >
                        Leading the way in precision engineering and innovative solutions for the modern
                        industrial landscape.
                    </Typography>
                </Container>
            </Box>

            {/* Mission Section with Image */}
            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 15 } }}>
                <Grid container spacing={8} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={engineDetail}
                            alt="Industrial Engineering"
                            sx={{
                                width: '100%',
                                height: { xs: '300px', md: '450px' },
                                objectFit: 'cover',
                                borderRadius: '2px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h2" fontWeight={800} sx={{ mb: 4, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                            Driven by Precision, <br />
                            <Box component="span" sx={{ color: 'secondary.main' }}>
                                Powered by Innovation.
                            </Box>
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: '1.1rem', color: 'text.secondary', mb: 4, lineHeight: 1.8 }}
                        >
                            Charitysun Engineering is a multi-disciplinary firm dedicated to pushing the
                            boundaries of what's possible in the industrial landscape. We combine decades of
                            technical expertise with state-of-the-art digital infrastructure.
                        </Typography>
                        <Stack spacing={3}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Box sx={{ color: 'secondary.main', pt: 0.5 }}>
                                    <ArrowForwardIcon />
                                </Box>
                                <Typography variant="body1">
                                    Global standards in automobile part manufacturing
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Box sx={{ color: 'secondary.main', pt: 0.5 }}>
                                    <ArrowForwardIcon />
                                </Box>
                                <Typography variant="body1">
                                    Advanced mechanical machinery maintenance systems
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Box sx={{ color: 'secondary.main', pt: 0.5 }}>
                                    <ArrowForwardIcon />
                                </Box>
                                <Typography variant="body1">
                                    Next-gen ERP solutions for industrial automation
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>

            {/* Automotive Section */}
            <Box sx={{ bgcolor: '#F9FAFB', py: { xs: 8, md: 15 } }}>
                <Container maxWidth="lg">
                    <Grid container spacing={8} alignItems="center" direction="row-reverse">
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                src={automotiveParts}
                                alt="Automotive Systems"
                                sx={{
                                    width: '100%',
                                    height: { xs: '300px', md: '450px' },
                                    objectFit: 'cover',
                                    borderRadius: '2px',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="overline"
                                color="secondary"
                                fontWeight={800}
                                letterSpacing={2}
                                sx={{ mb: 2, display: 'block' }}
                            >
                                AUTOMOTIVE EXCELLENCE
                            </Typography>
                            <Typography variant="h2" fontWeight={800} sx={{ mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                                Next-Gen Automotive Solutions
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
                            >
                                Our automotive division provides comprehensive solutions for fleet management,
                                maintenance tracking, and performance optimization. We combine decades of
                                automotive expertise with modern digital tools to deliver unmatched precision.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: { xs: 8, md: 12 } }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6} textAlign="center">
                        <Grid item xs={12} md={3}>
                            <Typography variant="h2" fontWeight={900} sx={{ mb: 1 }}>
                                20+
                            </Typography>
                            <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                Years of Excellence
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="h2" fontWeight={900} sx={{ mb: 1 }}>
                                500+
                            </Typography>
                            <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                Projects Delivered
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="h2" fontWeight={900} sx={{ mb: 1 }}>
                                50+
                            </Typography>
                            <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                Expert Engineers
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="h2" fontWeight={900} sx={{ mb: 1 }}>
                                100%
                            </Typography>
                            <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                Client Satisfaction
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;
