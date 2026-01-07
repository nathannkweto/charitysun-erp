import { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, MenuItem, Button, Grid, FormControlLabel, Checkbox
} from '@mui/material';
import {
    AccountControllerService,
    type AccountCreateRequest,
    type AccountDTO,
    type JsonNullableUUID
} from '../../../client';

interface CreateAccountModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    existingAccounts: AccountDTO[];
}

type AccountType = 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';

const CreateAccountModal = ({ open, onClose, onSuccess, existingAccounts }: CreateAccountModalProps) => {
    const accountTypes: AccountType[] = ['ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE'];

    const [formData, setFormData] = useState({
        code: '',
        name: '',
        type: 'ASSET' as AccountType,
        description: '',
        isPlaceholder: false,
        parentAccountId: '',
        currencyCode: 'USD'
    });

    const handleSubmit = async () => {
        try {
            const submissionData: AccountCreateRequest = {
                ...formData,
                parentAccountId: (formData.parentAccountId === ""
                    ? undefined
                    : formData.parentAccountId as unknown as JsonNullableUUID)
            };

            await AccountControllerService.createAccount(submissionData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to create account:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }}>Add New Account</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 4 }}>
                        <TextField
                            label="Code"
                            fullWidth
                            size="small"
                            value={formData.code}
                            onChange={(e) => setFormData({...formData, code: e.target.value})}
                        />
                    </Grid>
                    <Grid size={{ xs: 8 }}>
                        <TextField
                            label="Account Name"
                            fullWidth
                            size="small"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            select
                            label="Account Type"
                            fullWidth
                            size="small"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value as AccountType})}
                        >
                            {accountTypes.map(t => (
                                <MenuItem key={t} value={t}>{t}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            select
                            label="Parent Account"
                            fullWidth
                            size="small"
                            value={formData.parentAccountId}
                            onChange={(e) => setFormData({...formData, parentAccountId: e.target.value})}
                        >
                            <MenuItem value=""><em>None (Root)</em></MenuItem>
                            {existingAccounts
                                .filter(a => a.isPlaceholder)
                                .map(a => (
                                    <MenuItem key={a.id} value={a.id ?? ""}>
                                        {a.code} - {a.name}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.isPlaceholder}
                                    onChange={(e) => setFormData({...formData, isPlaceholder: e.target.checked})}
                                />
                            }
                            label="Is Placeholder (Header/Group Account)"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={!formData.code || !formData.name}
                >
                    Create Account
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateAccountModal;