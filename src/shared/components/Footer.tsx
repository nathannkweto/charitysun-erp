import { Box, Typography } from '@mui/material';

export const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                px: 3,
                mt: 'auto',
                backgroundColor: (theme) => theme.palette.grey[100],
                borderTop: '1px solid rgba(0,0,0,0.05)'
            }}
        >
            <Typography variant="body2" color="text.secondary" align="center">
                {'© '}
                {new Date().getFullYear()}
                {' CharitySun Engineering ERP. All rights reserved.'}
            </Typography>
        </Box>
    );
};