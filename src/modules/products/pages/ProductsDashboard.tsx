import React, { useState, useMemo } from 'react';
import {
    Box, Typography, Tabs, Tab, Container, Grid,
    TextField, Paper, Button, Autocomplete, CircularProgress, debounce, Stack,
    Snackbar, Alert
} from '@mui/material';
import { Factory, Add, AccountTree, PrecisionManufacturing, CheckCircle } from '@mui/icons-material';
import { useProducts } from '../hooks/useProducts';
import { CreateProductForm } from '../components/CreateProductForm';
import { BomTree } from '../components/BomTree';
import { type ProductDTO } from '../../../client';

export const ProductDashboard = () => {
    const {
        loading, currentBom, searchProducts,
        createProduct, fetchBom, addBomComponent, startProductionRun
    } = useProducts();

    const [activeTab, setActiveTab] = useState(0);
    const [searchOptions, setSearchOptions] = useState<ProductDTO[]>([]);
    const [searching, setSearching] = useState(false);

    const [runSuccess, setRunSuccess] = useState(false);

    const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
    const [selectedProdId, setSelectedProdId] = useState<string | null>(null);

    const handleSearch = useMemo(() => debounce(async (query: string) => {
        if (query.length < 2) return;
        setSearching(true);
        const results = await searchProducts(query);
        setSearchOptions(results);
        setSearching(false);
    }, 300), [searchProducts]);

    const handleAddBomItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.currentTarget;
        const qty = (target.elements.namedItem('qty') as HTMLInputElement).value;

        if (currentBom?.productId && selectedComponentId) {
            await addBomComponent(currentBom.productId, {
                componentProductId: selectedComponentId,
                quantity: Number(qty)
            });
            target.reset();
            setSelectedComponentId(null);
        }
    };

    const handleProductionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.currentTarget;
        const batch = (target.elements.namedItem('batch') as HTMLInputElement).value;
        const qty = (target.elements.namedItem('qty') as HTMLInputElement).value;

        if (selectedProdId) {
            try {
                await startProductionRun({
                    productId: selectedProdId,
                    batchNumber: batch,
                    quantity: Number(qty)
                });
                target.reset();
                setSelectedProdId(null);
                setRunSuccess(true); // Trigger success signal
            } catch (error) {
                console.error("Failed to start production run", error);
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Factory sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h4" fontWeight="bold">Product & Manufacturing</Typography>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
                    <Tab icon={<Add />} iconPosition="start" label="New Product" />
                    <Tab icon={<AccountTree />} iconPosition="start" label="BOM Structure" />
                    <Tab icon={<PrecisionManufacturing />} iconPosition="start" label="Production Run" />
                </Tabs>
            </Box>

            {activeTab === 0 && <Box maxWidth="md"><CreateProductForm onSubmit={createProduct} /></Box>}

            {activeTab === 1 && (
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Paper sx={{ p: 2, mb: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>Load Product BOM</Typography>
                            <Autocomplete
                                options={searchOptions}
                                loading={searching}
                                getOptionLabel={(opt) => `[${opt.sku}] ${opt.name}`}
                                onInputChange={(_, v) => handleSearch(v)}
                                onChange={(_, v) => v?.id && fetchBom(v.id)}
                                renderInput={(params) => (
                                    <TextField {...params} size="small" label="Search SKU/Name"
                                               InputProps={{...params.InputProps,
                                                   endAdornment: <>{searching ? <CircularProgress size={20} /> : null}{params.InputProps.endAdornment}</>
                                               }} />
                                )}
                            />
                        </Paper>

                        {currentBom && (
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>Add Component</Typography>
                                <Box component="form" onSubmit={handleAddBomItem}>
                                    <Autocomplete
                                        options={searchOptions}
                                        loading={searching}
                                        getOptionLabel={(opt) => `[${opt.sku}] ${opt.name}`}
                                        onInputChange={(_, v) => handleSearch(v)}
                                        onChange={(_, v) => setSelectedComponentId(v?.id || null)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Search Name or SKU"
                                                size="small"
                                                fullWidth
                                                margin="dense"
                                                required
                                            />
                                        )}
                                        renderOption={(props, option) => (
                                            <Box component="li" {...props} key={option.id}>
                                                <Stack direction="column">
                                                    <Typography variant="body2" fontWeight="bold">{option.name}</Typography>
                                                    <Typography variant="caption" color="text.secondary">SKU: {option.sku}</Typography>
                                                </Stack>
                                            </Box>
                                        )}
                                    />
                                    <TextField name="qty" label="Quantity" type="number" size="small" fullWidth margin="dense" required />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        sx={{ mt: 1 }}
                                        disabled={!selectedComponentId || loading}
                                    >
                                        {loading ? <CircularProgress size={20} /> : "Add to BOM"}
                                    </Button>
                                </Box>
                            </Paper>
                        )}
                    </Grid>

                    <Grid size={{ xs: 12, md: 8 }}>
                        {loading && !currentBom ? <Typography>Loading...</Typography> : currentBom ? <BomTree bom={currentBom} /> :
                            <Box sx={{ p: 6, border: '2px dashed', borderColor: 'divider', textAlign: 'center' }}>
                                <Typography color="text.secondary">Search for a product to view its structure</Typography>
                            </Box>}
                    </Grid>
                </Grid>
            )}

            {activeTab === 2 && (
                <Box maxWidth="sm">
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Start Production Run</Typography>
                        <Box component="form" onSubmit={handleProductionSubmit}>
                            <Autocomplete
                                options={searchOptions}
                                loading={searching}
                                getOptionLabel={(opt) => `[${opt.sku}] ${opt.name}`}
                                onInputChange={(_, v) => handleSearch(v)}
                                onChange={(_, v) => setSelectedProdId(v?.id || null)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Search Product" fullWidth margin="normal" required />
                                )}
                            />
                            <TextField name="batch" label="Batch Number" placeholder="BATCH-001" fullWidth margin="normal" required />
                            <TextField name="qty" label="Quantity" type="number" fullWidth margin="normal" required />
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                                size="large"
                                sx={{ mt: 2 }}
                                disabled={!selectedProdId || loading}
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                            >
                                {loading ? "Starting..." : "Start Run"}
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            )}

            <Snackbar
                open={runSuccess}
                autoHideDuration={5000}
                onClose={() => setRunSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setRunSuccess(false)}
                    severity="success"
                    variant="filled"
                    icon={<CheckCircle fontSize="inherit" />}
                    sx={{ width: '100%' }}
                >
                    Production run started!
                </Alert>
            </Snackbar>
        </Container>
    );
};