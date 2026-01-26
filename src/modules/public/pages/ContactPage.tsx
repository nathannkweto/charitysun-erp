import React from 'react';
import { Box, Container, Grid } from '@mui/material';

// Components
import { PageHero } from '../components/PageHero';
import { ContactForm } from '../components/ContactForm';
import { ContactDetails } from '../components/ContactDetails';

const ContactPage: React.FC = () => {
    return (
            <Box>
                <PageHero
                    overline="GET IN TOUCH"
                    title="Contact Us"
                    description="Ready to start your next project? Our team is here to help bring your vision to life."
                />

                <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
                    <Grid container spacing={8}>
                        {/* Contact Form */}
                        <Grid size={{ xs: 12, md: 7 }}>
                            <ContactForm />
                        </Grid>

                        {/* Contact Information */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <ContactDetails />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
    );
};

export default ContactPage;