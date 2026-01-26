import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ServiceSectionProps {
    title: string;
    subtitle: string;
    image: string;
    reverse?: boolean;
    children?: React.ReactNode;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({
                                                                  title,
                                                                  subtitle,
                                                                  image,
                                                                  reverse,
                                                                  children,
                                                              }) => (
    <Box sx={{ py: { xs: 8, md: 15 }, bgcolor: reverse ? '#F9FAFB' : '#FFFFFF' }}>
        <Container maxWidth="lg">
            <Grid
                container
                spacing={8}
                direction={reverse ? 'row-reverse' : 'row'}
                alignItems="center"
            >
                {/* Image Side */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: { xs: '300px', md: '500px' },
                            borderRadius: '2px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                        }}
                    >
                        <Box
                            component="img"
                            src={image}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                </Grid>

                {/* Content Side */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        variant="overline"
                        color="secondary"
                        fontWeight={800}
                        letterSpacing={2}
                        sx={{ mb: 2, display: 'block' }}
                    >
                        {subtitle}
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            mb: 4,
                            color: '#0F172A',
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            lineHeight: 1.1,
                        }}
                    >
                        {title}
                    </Typography>
                    {children}
                    <Button
                        variant="text"
                        color="secondary"
                        endIcon={<ArrowForwardIosIcon sx={{ fontSize: '0.8rem !important' }} />}
                        sx={{
                            mt: 2,
                            p: 0,
                            fontWeight: 700,
                            '&:hover': { background: 'none', textDecoration: 'underline' },
                        }}
                    >
                        LEARN MORE
                    </Button>
                </Grid>
            </Grid>
        </Container>
    </Box>
);