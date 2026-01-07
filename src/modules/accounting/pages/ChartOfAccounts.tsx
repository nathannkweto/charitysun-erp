import { useState } from 'react';
import { Box, Typography, Button, Paper, Breadcrumbs, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountListTable from '../components/AccountListTable';
import CreateAccountModal from '../components/CreateAccountModal'; // Ensure this path is correct
import { useAccounts } from '../hooks/useAccounts';

const ChartOfAccounts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { accounts, loading, refresh } = useAccounts();

    return (
        <Box sx={{ p: 4 }}>
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link underline="hover" color="inherit" href="/accounting">Accounting</Link>
                <Typography color="text.primary">Chart of Accounts</Typography>
            </Breadcrumbs>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Chart of Accounts</Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setIsModalOpen(true)}
                >
                    Create Account
                </Button>
            </Box>

            <Paper sx={{ width: '100%', borderRadius: 2 }}>
                <AccountListTable accounts={accounts} loading={loading} />
            </Paper>

            <CreateAccountModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    refresh();
                    setIsModalOpen(false);
                }}
                existingAccounts={accounts}
            />
        </Box>
    );
};

export default ChartOfAccounts;