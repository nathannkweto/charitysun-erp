import { Paper, Typography, Stack, Grid, TextField, Button } from '@mui/material';

export const ContactForm = () => {
    return (
        <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E7EB', borderRadius: '2px' }}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                Send us a message
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Fill out the form below and our team will get back to you within 24 hours.
            </Typography>
            <Stack spacing={3}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="First Name" variant="outlined" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
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
    );
};