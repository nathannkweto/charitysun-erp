import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';
import { type PhaseCreateRequest } from '../../../client';

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: PhaseCreateRequest) => Promise<void>;
}

export const CreatePhaseDialog: React.FC<Props> = ({ open, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<PhaseCreateRequest>({
        name: '',
        description: '',
        startDate: '',
        endDate: ''
    });

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Add Project Phase</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Phase Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth type="date" label="Start" InputLabelProps={{ shrink: true }} value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth type="date" label="End" InputLabelProps={{ shrink: true }} value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Add Phase</Button>
            </DialogActions>
        </Dialog>
    );
};