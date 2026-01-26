import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

// Assets
import engineDetail from '../../../assets/engine-detail.jpg';
import automotiveParts from '../../../assets/automotive-parts.jpg';

// Components
import { ServiceCard } from '../components/ServiceCard';
import { FeaturedServiceSection } from '../components/FeaturedServiceSection';
import { CTASection } from '../components/CTASection';

const ServicesPage: React.FC = () => {
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

                {/* Service Cards Grid */}
                <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 4 }}>

                            <ServiceCard
                                icon={<EngineeringIcon sx={{ fontSize: 48 }} />}
                                title="Mechanical Engineering"
                                description="Precision component manufacturing, industrial machinery design, and automation systems engineered for maximum reliability and performance."
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>

                            <ServiceCard
                                icon={<SettingsSuggestIcon sx={{ fontSize: 48 }} />}
                                title="Automotive Solutions"
                                description="Advanced automotive design, maintenance systems, and fleet management platforms optimized for modern transport requirements."
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>

                            <ServiceCard
                                icon={<PrecisionManufacturingIcon sx={{ fontSize: 48 }} />}
                                title="Digital ERP Platform"
                                description="Comprehensive ERP systems with real-time telemetry, administrative controls, and data-driven insights for scalable growth."
                            />
                        </Grid>
                    </Grid>
                </Container>

                {/* Featured Service Sections */}
                <FeaturedServiceSection
                    image={engineDetail}
                    overline="MECHANICAL SYSTEMS"
                    title="Precision Manufacturing"
                    description="Our mechanical engineering division specializes in high-precision manufacturing for industrial applications. From component design to full-scale automation systems, we deliver solutions that meet the highest standards of quality and reliability."
                />

                <FeaturedServiceSection
                    image={automotiveParts}
                    overline="AUTOMOTIVE EXCELLENCE"
                    title="Next-Gen Solutions"
                    description="Our automotive division provides comprehensive solutions for fleet management, maintenance tracking, and performance optimization. We combine decades of automotive expertise with modern digital tools."
                    reverse
                    ctaText="Learn More"
                />

                <CTASection />
            </Box>
    );
};

export default ServicesPage;