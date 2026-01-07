import { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, Table, TableHead,
    TableRow, TableCell, TableBody, TextField, Button, Typography, Box, IconButton, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { JournalEntryControllerService, type AccountDTO } from '../../../client';

interface Props {
    open: boolean;
    onClose: () => void;
    accounts: AccountDTO[];
    onSuccess: () => void;
}

const JournalEntryModal = ({ open, onClose, accounts }: Props) => {
    const [lines, setLines] = useState([{ accountId: '', debit: 0, credit: 0, description: '' }]);
    const [header, setHeader] = useState({ description: '', date: new Date().toISOString().split('T')[0] });

    const totalDebit = lines.reduce((sum, l) => sum + l.debit, 0);
    const totalCredit = lines.reduce((sum, l) => sum + l.credit, 0);
    const isBalanced = totalDebit === totalCredit && totalDebit > 0;

    const addLine = () => setLines([...lines, { accountId: '', debit: 0, credit: 0, description: '' }]);

    const handlePost = async () => {
        await JournalEntryControllerService.createJournalEntry({
            ...header,
            transactionDate: header.date,
            currencyCode: 'USD',
            lines: lines as any
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>New Journal Entry</DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', gap: 2, mb: 3, mt: 1 }}>
                    <TextField label="Date" type="date" size="small" value={header.date}
                               onChange={(e) => setHeader({...header, date: e.target.value})} />
                    <TextField label="Reference/Description" fullWidth size="small"
                               onChange={(e) => setHeader({...header, description: e.target.value})} />
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Account</TableCell>
                            <TableCell width={150}>Debit</TableCell>
                            <TableCell width={150}>Credit</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lines.map((line, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <TextField select fullWidth size="small" value={line.accountId}
                                               onChange={(e) => {
                                                   const newLines = [...lines];
                                                   newLines[i].accountId = e.target.value;
                                                   setLines(newLines);
                                               }}>
                                        {accounts.filter(a => !a.isPlaceholder).map(a => (
                                            <MenuItem key={a.id} value={a.id}>{a.code} - {a.name}</MenuItem>
                                        ))}
                                    </TextField>
                                </TableCell>
                                <TableCell>
                                    <TextField type="number" size="small"
                                               onChange={(e) => {
                                                   const nl = [...lines];
                                                   nl[i].debit = Number(e.target.value);
                                                   setLines(nl);
                                               }} />
                                </TableCell>
                                <TableCell>
                                    <TextField type="number" size="small"
                                               onChange={(e) => {
                                                   const nl = [...lines];
                                                   nl[i].credit = Number(e.target.value);
                                                   setLines(nl);
                                               }} />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => setLines(lines.filter((_, idx) => idx !== i))}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button onClick={addLine} sx={{ mt: 2 }}>Add Line</Button>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 4 }}>
                    <Typography color={isBalanced ? "success.main" : "error.main"} variant="h6">
                        Difference: ${(totalDebit - totalCredit).toFixed(2)}
                    </Typography>
                </Box>
            </DialogContent>
            <Box sx={{ p: 2, textAlign: 'right' }}>
                <Button onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
                <Button variant="contained" disabled={!isBalanced} onClick={handlePost}>Post Entry</Button>
            </Box>
        </Dialog>
    );
};

export default JournalEntryModal;