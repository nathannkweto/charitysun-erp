import React from 'react';
import { Box, Typography, Button, CircularProgress, Alert, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import useProducts from '../hooks/useProducts';
import ProductTable from '../components/ProductTable';
import ProductStats from '../components/ProductStats';

const ProductsPage: React.FC = () => {
    const { products, loading, error, refetch } = useProducts();

    if (loading && products.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress size={40} thickness={4} />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Box>
                    <Typography variant="h1" sx={{ mb: 1 }}>
                        Product Inventory
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage and monitor your engineering project components and assets.
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={() => refetch()}
                        disabled={loading}
                    >
                        Refresh
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                    >
                        Add Product
                    </Button>
                </Stack>
            </Stack>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <ProductStats products={products} />

            <Typography variant="h2" sx={{ mb: 2, fontSize: '1.25rem' }}>
                All Products
            </Typography>

            <ProductTable products={products} />
        </Box>
    );
};

export default ProductsPage;
