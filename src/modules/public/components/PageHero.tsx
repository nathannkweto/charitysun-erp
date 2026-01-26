import React from 'react';
import { Box, Container, Typography } from '@mui/material';

interface PageHeroProps {
    overline: string;
    title: string;
    description: string;
}

export const PageHero: React.FC<PageHeroProps> = ({ overline, title, description }) => {
    return (
        <Box sx={{ pt: { xs: 15, md: 20 }, pb: { xs: 8, md: 12 }, bgcolor: '#F9FAFB' }}>
            <Container maxWidth="lg">
                <Typography
                    variant="overline"
                    color="secondary"
                    fontWeight={800}
                    letterSpacing={2}
                    sx={{ mb: 2, display: 'block' }}
                >
                    {overline}
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
                    {title}
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, lineHeight: 1.6 }}>
                    {description}
                </Typography>
            </Container>
        </Box>
    );
};