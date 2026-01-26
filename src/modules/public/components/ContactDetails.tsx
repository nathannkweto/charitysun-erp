import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const ContactInfoItem = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
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

export const ContactDetails = () => {
    return (
        <Box sx={{ position: 'sticky', top: 100 }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 4 }}>
                Contact Information
            </Typography>
            <Stack spacing={4}>
                <ContactInfoItem
                    icon={<LocationOnIcon />}
                    title="Address"
                    value="123 Engineering Way, Industrial Park, Tech City, TC 12345"
                />
                <ContactInfoItem
                    icon={<PhoneIcon />}
                    title="Phone"
                    value="+1 (555) 123-4567"
                />
                <ContactInfoItem
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
    );
};