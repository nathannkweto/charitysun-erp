import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Chip, LinearProgress, Typography
} from '@mui/material';
import { type AccountDTO } from '../../../client';

interface AccountListTableProps {
    accounts: AccountDTO[];
    loading: boolean;
}

const AccountListTable = ({ accounts, loading }: AccountListTableProps) => {
    if (loading) return <LinearProgress sx={{ my: 2 }} />;

    if (accounts.length === 0) {
        return <Typography sx={{ p: 4, textAlign: 'center' }}>No accounts found. Start by adding one.</Typography>;
    }

    return (
        <TableContainer>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Code</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Account Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accounts.map((account) => (
                        <TableRow
                            key={account.id}
                            hover
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                        >
                            <TableCell>{account.code}</TableCell>
                            <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: account.isPlaceholder ? 700 : 400 }}>
                                    {account.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={account.type}
                                    size="small"
                                    color={account.type === 'ASSET' ? 'success' : 'primary'}
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell align="right" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                                {account.currentBalance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AccountListTable;