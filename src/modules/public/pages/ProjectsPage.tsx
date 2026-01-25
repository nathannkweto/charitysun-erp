import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import heroBg from '@/assets/hero-bg.jpg';

const ProjectCard = ({ title, category, image }: { title: string; category: string; image: string }) => (
    <Paper
        elevation={0}
        sx={{
            borderRadius: '2px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(4px)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)',
            },
        }}
    >
        <Box
            component="img"
            src={image}
            sx={{ width: '100%', height: '300px', objectFit: 'cover' }}
        />
        <Box sx={{ p: 3 }}>
            <Typography variant="overline" color="secondary" fontWeight={800} letterSpacing={1.5}>
                {category}
            </Typography>
            <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                {title}
            </Typography>
        </Box>
    </Paper>
);

const ProjectsPage: React.FC = () => {
    const projects = [
        {
            title: 'Industrial Automation System',
            category: 'MECHANICAL',
            image: heroBg,
        },
        {
            title: 'Fleet Management Platform',
            category: 'AUTOMOTIVE',
            image: heroBg,
        },
        {
            title: 'Manufacturing ERP Integration',
            category: 'DIGITAL',
            image: heroBg,
        },
        {
            title: 'Precision Component Design',
            category: 'MECHANICAL',
            image: heroBg,
        },
        {
            title: 'Performance Tracking System',
            category: 'AUTOMOTIVE',
            image: heroBg,
        },
        {
            title: 'Real-time Telemetry Dashboard',
            category: 'DIGITAL',
            image: heroBg,
        },
    ];

    return (
        <Box>
            {/* Page Hero */}
            <Box sx={{ pt: { xs: 15, md: 20 }, pb: { xs: 8, md: 12 }, bgcolor: '#F9FAFB' }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="overline"
                        color="secondary"
                        fontWeight={800}
                        letterSpacing={2}
                        sx={{ mb: 2, display: 'block' }}
                    >
                        OUR WORK
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
                        Featured Projects
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, lineHeight: 1.6 }}>
                        Explore our portfolio of engineering excellence across mechanical, automotive,
                        and digital platforms.
                    </Typography>
                </Container>
            </Box>

            {/* Projects Grid */}
            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
                <Grid container spacing={4}>
                    {projects.map((project, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <ProjectCard {...project} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default ProjectsPage;
