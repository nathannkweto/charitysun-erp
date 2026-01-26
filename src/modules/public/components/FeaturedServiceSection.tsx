import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

interface FeaturedServiceSectionProps {
    image: string;
    overline: string;
    title: string;
    description: string;
    reverse?: boolean;
    ctaText?: string;
}

export const FeaturedServiceSection: React.FC<FeaturedServiceSectionProps> = ({
                                                                                  image,
                                                                                  overline,
                                                                                  title,
                                                                                  description,
                                                                                  reverse,
                                                                                  ctaText = "Get Started"
                                                                              }) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ bgcolor: reverse ? '#F9FAFB' : '#FFFFFF', py: { xs: 8, md: 15 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={8} alignItems="center" direction={reverse ? 'row-reverse' : 'row'}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            component="img"
                            src={image}
                            sx={{
                                width: '100%',
                                height: '500px',
                                objectFit: 'cover',
                                borderRadius: '2px',
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="overline" color="secondary" fontWeight={800} letterSpacing={2}>
                            {overline}
                        </Typography>
                        <Typography variant="h2" sx={{ fontWeight: 800, my: 3 }}>
                            {title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                            {description}
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            endIcon={<ArrowForwardIcon />}
                            onClick={() => navigate('/contact')}
                        >
                            {ctaText}
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};