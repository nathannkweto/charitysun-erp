import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Grid, InputAdornment, MenuItem
} from '@mui/material';
import { type ProjectCreateRequest, type DepartmentDTO } from '../../../client';

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ProjectCreateRequest) => Promise<void>;
    departments: DepartmentDTO[];
}

export const CreateProjectDialog: React.FC<Props> = ({ open, onClose, onSubmit, departments }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ProjectCreateRequest>({
        name: '',
        code: '',
        description: '',
        startDate: '',
        endDate: '',
        budgetAmount: 0,
        departmentId: ''
    });

    useEffect(() => {
        if (open) {
            setFormData({
                name: '', code: '', description: '',
                startDate: '', endDate: '', budgetAmount: 0,
                departmentId: ''
            });
        }
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'budgetAmount' ? Number(value) : value
        });
    };

    const handleFormSubmit = async () => {
        setLoading(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold' }}>Create New Project</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth label="Project Code" name="code"
                            value={formData.code} onChange={handleChange} required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth label="Project Name" name="name"
                            value={formData.name} onChange={handleChange} required
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            select
                            fullWidth
                            label="Department"
                            name="departmentId"
                            value={formData.departmentId}
                            onChange={handleChange}
                            required
                        >
                            {departments.map((d) => (
                                <MenuItem key={d.id} value={d.id}>
                                    {d.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth label="Description" name="description"
                            value={formData.description} multiline rows={3} onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth label="Start Date" name="startDate" type="date"
                            value={formData.startDate} InputLabelProps={{ shrink: true }}
                            onChange={handleChange} required
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth label="End Date" name="endDate" type="date"
                            value={formData.endDate} InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth label="Budget" name="budgetAmount" type="number"
                            value={formData.budgetAmount}
                            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button
                    onClick={handleFormSubmit}
                    variant="contained"
                    disabled={loading || !formData.departmentId}
                >
                    {loading ? 'Creating...' : 'Create Project'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};