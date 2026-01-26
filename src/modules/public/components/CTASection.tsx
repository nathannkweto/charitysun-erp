import { Box, Container, Stack, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const CTASection = () => {
    const navigate = useNavigate();

    return (
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
    );
};