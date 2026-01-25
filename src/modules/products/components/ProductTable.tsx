import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Chip,
    IconButton,
    Box,
    alpha
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Product } from '@/client/services/ProductControllerService';

interface ProductTableProps {
    products: Product[];
}

const getStatusColor = (status: Product['status']) => {
    switch (status) {
        case 'ACTIVE': return 'success';
        case 'INACTIVE': return 'default';
        case 'OUT_OF_STOCK': return 'error';
        default: return 'default';
    }
};

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
    return (
        <TableContainer component={Paper} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ bgcolor: alpha('#F8FAFC', 0.5) }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Product Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>SKU</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow
                            key={product.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: alpha('#F1F5F9', 0.5) } }}
                        >
                            <TableCell>
                                <Typography variant="body2" fontWeight={600} color="primary.main">
                                    {product.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="caption" sx={{ fontFamily: 'monospace', bgcolor: '#F1F5F9', px: 1, py: 0.5, borderRadius: 1 }}>
                                    {product.sku}
                                </Typography>
                            </TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>
                                <Typography variant="body2" fontWeight={500}>
                                    ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" color={product.stock < 5 ? 'error.main' : 'text.primary'}>
                                    {product.stock}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={product.status.replace(/_/g, ' ')}
                                    size="small"
                                    color={getStatusColor(product.status)}
                                    sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                    <IconButton size="small" color="primary">
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" color="error">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small">
                                        <MoreVertIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;
