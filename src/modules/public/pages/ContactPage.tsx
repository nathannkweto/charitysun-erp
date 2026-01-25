import React from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    TextField,
    Button,
    Stack,
    Paper,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const ContactInfo = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
    <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box sx={{ color: 'secondary.main', mt: 0.5 }}>{icon}</Box>
        <Box>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {value}
            </Typography>
        </Box>
    </Stack>
);

const ContactPage: React.FC = () => {
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
                        GET IN TOUCH
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
                        Contact Us
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, lineHeight: 1.6 }}>
                        Ready to start your next project? Our team is here to help bring your vision
                        to life.
                    </Typography>
                </Container>
            </Box>

            {/* Contact Form & Info */}
            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
                <Grid container spacing={8}>
                    {/* Contact Form */}
                    <Grid item xs={12} md={7}>
                        <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                                Send us a message
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                Fill out the form below and our team will get back to you within 24 hours.
                            </Typography>
                            <Stack spacing={3}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="First Name" variant="outlined" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Last Name" variant="outlined" />
                                    </Grid>
                                </Grid>
                                <TextField fullWidth label="Email" type="email" variant="outlined" />
                                <TextField fullWidth label="Phone Number" variant="outlined" />
                                <TextField fullWidth label="Company" variant="outlined" />
                                <TextField
                                    fullWidth
                                    label="Message"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    sx={{ alignSelf: 'flex-start', px: 6, py: 1.5 }}
                                >
                                    Send Message
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>

                    {/* Contact Information */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ position: 'sticky', top: 100 }}>
                            <Typography variant="h5" fontWeight={700} sx={{ mb: 4 }}>
                                Contact Information
                            </Typography>
                            <Stack spacing={4}>
                                <ContactInfo
                                    icon={<LocationOnIcon />}
                                    title="Address"
                                    value="123 Engineering Way, Industrial Park, Tech City, TC 12345"
                                />
                                <ContactInfo
                                    icon={<PhoneIcon />}
                                    title="Phone"
                                    value="+1 (555) 123-4567"
                                />
                                <ContactInfo
                                    icon={<EmailIcon />}
                                    title="Email"
                                    value="info@charitysun.com"
                                />
                            </Stack>

                            <Box sx={{ mt: 6, p: 4, bgcolor: '#F9FAFB', borderRadius: '2px' }}>
                                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                                    Business Hours
                                </Typography>
                                <Stack spacing={1}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2">Monday - Friday</Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            8:00 AM - 6:00 PM
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2">Saturday</Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            9:00 AM - 2:00 PM
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2">Sunday</Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            Closed
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ContactPage;
