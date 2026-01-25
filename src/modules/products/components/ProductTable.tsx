import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
}

interface ProductTableProps {
    products: Product[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell component="th" scope="row">{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell align="right">
                                <Button size="small" onClick={() => onEdit(product.id)}>Edit</Button>
                                <Button size="small" color="error" onClick={() => onDelete(product.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;
