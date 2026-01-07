import {
    Box, Typography, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Chip, Button
} from '@mui/material';
import { useJournalEntries } from '../hooks/useJournalEntries';
import FilterListIcon from '@mui/icons-material/FilterList';

const GeneralLedger = () => {
    const { entries } = useJournalEntries();

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>General Ledger</Typography>
                <Button variant="outlined" startIcon={<FilterListIcon />}>
                    Filters
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Reference</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map((entry) => (
                            <TableRow key={entry.id} hover>
                                <TableCell>{entry.transactionDate}</TableCell>
                                <TableCell sx={{ fontWeight: 500 }}>{entry.description}</TableCell>
                                <TableCell>{entry.id?.toString().substring(0, 8)}...</TableCell>
                                <TableCell>
                                    <Chip
                                        label={entry.status}
                                        size="small"
                                        color={entry.status === 'POSTED' ? 'success' : 'default'}
                                    />
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                    {entry.totalAmount?.toLocaleString(undefined, {
                                        style: 'currency',
                                        currency: entry.currencyCode || 'USD'
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default GeneralLedger;