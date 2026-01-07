import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Inventory2 } from '@mui/icons-material';

interface Props {
    productCount: number;
}

export const ProductStats: React.FC<Props> = ({ productCount }) => {
    return (
        <Card sx={{ height: '100%', bgcolor: 'secondary.dark', color: 'white' }}>
            <CardContent>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Inventory2 sx={{ mr: 1 }} /> Engineering & Catalog
                </Typography>

                <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h2" fontWeight="bold">
                        {productCount}
                    </Typography>
                    <Typography variant="subtitle1">Total SKUs</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};