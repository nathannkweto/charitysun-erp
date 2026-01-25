import React from 'react';
import { Box, Grid, Paper, Typography, alpha } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Product } from '@/client/services/ProductControllerService';

interface ProductStatsProps {
    products: Product[];
}

const StatCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) => (
    <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '12px',
            bgcolor: alpha(color, 0.1),
            color: color
        }}>
            {icon}
        </Box>
        <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {title}
            </Typography>
            <Typography variant="h5" fontWeight={700}>
                {value}
            </Typography>
        </Box>
    </Paper>
);

const ProductStats: React.FC<ProductStatsProps> = ({ products }) => {
    const totalProducts = products.length;
    const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
    const lowStock = products.filter(p => p.stock > 0 && p.stock < 5).length;
    const outOfStock = products.filter(p => p.stock === 0).length;

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    title="Total Products"
                    value={totalProducts}
                    icon={<InventoryIcon />}
                    color="#0F172A"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    title="Inventory Value"
                    value={`$${totalValue.toLocaleString()}`}
                    icon={<MonetizationOnIcon />}
                    color="#10B981"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    title="Low Stock"
                    value={lowStock}
                    icon={<WarningIcon />}
                    color="#F59E0B"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    title="Out of Stock"
                    value={outOfStock}
                    icon={<CheckCircleIcon />}
                    color="#EF4444"
                />
            </Grid>
        </Grid>
    );
};

export default ProductStats;
