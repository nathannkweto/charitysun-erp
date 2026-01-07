import { useState } from 'react';
import { Grid, Typography, Box, Paper, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useNavigate } from 'react-router-dom';

import { useAccounts } from '../hooks/useAccounts';
import { useJournalEntries } from '../hooks/useJournalEntries';
import FinancialSummaryCard from '../components/FinancialSummaryCard';
import AccountListTable from '../components/AccountListTable';
import JournalEntryModal from '../components/JournalEntryModal.tsx';

export const AccountingDashboard = () => {
    const navigate = useNavigate();
    const [entryModalOpen, setEntryModalOpen] = useState(false);
    const { accounts, loading: accLoading, refresh: refreshAccounts } = useAccounts();
    const { entries, loading: entriesLoading, refresh: refreshEntries } = useJournalEntries();

    const handleEntrySuccess = () => {
        refreshAccounts();
        refreshEntries();
    };

    const totalAssets = accounts
        .filter(a => a.type === 'ASSET')
        .reduce((sum, a) => sum + (a.currentBalance || 0), 0);

    const totalLiabilities = accounts
        .filter(a => a.type === 'LIABILITY')
        .reduce((sum, a) => sum + (a.currentBalance || 0), 0);

    return (
        <Box sx={{ p: 4 }}>
            {/* Header Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        Accounting
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Summary
                    </Typography>
                </Box>

                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        startIcon={<AccountTreeIcon />}
                        onClick={() => navigate('/accounting/chart-of-accounts')}
                    >
                        Chart of Accounts
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<ListAltIcon />}
                        onClick={() => navigate('/accounting/ledger')}
                    >
                        General Ledger
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setEntryModalOpen(true)}
                        sx={{ borderRadius: 2, px: 3 }}
                    >
                        New Journal Entry
                    </Button>
                </Stack>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FinancialSummaryCard
                        title="Assets"
                        amount={totalAssets}
                        color="#2e7d32"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FinancialSummaryCard
                        title="Liabilities"
                        amount={totalLiabilities}
                        color="#d32f2f"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FinancialSummaryCard
                        title="Equity"
                        amount={totalAssets - totalLiabilities}
                        color="#ed6c02"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FinancialSummaryCard
                        title="Income (MTD)"
                        amount={0}
                        color="#0288d1"
                    />
                </Grid>
            </Grid>

            {/* Main Content Grid */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                            Main Chart of Accounts
                        </Typography>
                        <AccountListTable accounts={accounts} loading={accLoading} />
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                            Recent Transactions
                        </Typography>
                        {entriesLoading ? (
                            <Typography>Loading...</Typography>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {entries.slice(0, 6).map((entry) => (
                                    <Box key={entry.id} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, borderLeft: '4px solid #1976d2' }}>
                                        <Typography variant="subtitle2" noWrap>{entry.description}</Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                            <Typography variant="caption" color="text.secondary">{entry.transactionDate}</Typography>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                ${entry.totalAmount?.toLocaleString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            {/* Modals */}
            <JournalEntryModal
                open={entryModalOpen}
                onClose={() => setEntryModalOpen(false)}
                accounts={accounts}
                onSuccess={handleEntrySuccess}
            />
        </Box>
    );
};
