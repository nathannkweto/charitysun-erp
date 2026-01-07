import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Paper,
    Typography,
    Grid,
    Snackbar,
    Alert,
    CircularProgress
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { type ProductCreateRequest } from '../../../client';

interface Props {
    onSubmit: (data: ProductCreateRequest) => Promise<void>;
}

export const CreateProductForm: React.FC<Props> = ({ onSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const [formData, setFormData] = useState<ProductCreateRequest>({
        name: '',
        sku: '',
        unitCost: 0,
        isAssembly: false
    });

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setFormData(prev => ({
            ...prev,
            unitCost: val === '' ? 0 : parseFloat(val)
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            isAssembly: e.target.checked
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
            setFormData({ name: '', sku: '', unitCost: 0, isAssembly: false });
            setSuccessOpen(true);
        } catch (error) {
            console.error("Creation failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 3, position: 'relative' }}>
            <Typography variant="h6" gutterBottom>
                Define New Product
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            name="name"
                            label="Product Name"
                            fullWidth
                            required
                            disabled={loading}
                            value={formData.name}
                            onChange={handleTextChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            name="sku"
                            label="SKU"
                            fullWidth
                            required
                            disabled={loading}
                            value={formData.sku}
                            onChange={handleTextChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            name="unitCost"
                            label="Standard Cost"
                            type="number"
                            fullWidth
                            required
                            disabled={loading}
                            inputProps={{ step: "0.01" }}
                            value={formData.unitCost}
                            onChange={handleNumberChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.isAssembly || false}
                                    onChange={handleCheckboxChange}
                                    disabled={loading}
                                />
                            }
                            label="Is Assembly? (Has BOM)"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button
                            variant="contained"
                            type="submit"
                            size="large"
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {loading ? 'Creating...' : 'Create Product'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Snackbar
                open={successOpen}
                autoHideDuration={4000}
                onClose={() => setSuccessOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSuccessOpen(false)}
                    severity="success"
                    variant="filled"
                    icon={<CheckCircleOutline fontSize="inherit" />}
                    sx={{ width: '100%' }}
                >
                    Product created successfully!
                </Alert>
            </Snackbar>
        </Paper>
    );
};