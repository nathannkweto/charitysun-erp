import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
    <Paper
        elevation={0}
        sx={{
            p: 4,
            height: '100%',
            borderRadius: '2px',
            border: '1px solid #E5E7EB',
            transition: 'all 0.3s ease',
            '&:hover': {
                borderColor: 'secondary.main',
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
            },
        }}
    >
        <Box sx={{ color: 'secondary.main', mb: 3 }}>{icon}</Box>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
            {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {description}
        </Typography>
    </Paper>
);