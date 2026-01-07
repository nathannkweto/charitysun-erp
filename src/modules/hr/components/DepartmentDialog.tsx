import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Box, CircularProgress
} from '@mui/material';
import { type DepartmentCreateRequest } from '../../../client';

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: DepartmentCreateRequest) => Promise<void>;
}

export const DepartmentDialog: React.FC<Props> = ({ open, onClose, onSubmit }) => {
    const [submitting, setSubmitting] = React.useState(false);
    const { control, handleSubmit, reset } = useForm<DepartmentCreateRequest>({
        defaultValues: { name: '', code: '' }
    });

    React.useEffect(() => {
        if (open) reset({ name: '', code: '' });
    }, [open, reset]);

    const handleFormSubmit = async (data: DepartmentCreateRequest) => {
        setSubmitting(true);
        try {
            await onSubmit(data);
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ bgcolor: 'secondary.main', color: 'white' }}>
                Create New Department
            </DialogTitle>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogContent dividers>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'Name is required' }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Department Name"
                                    fullWidth
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                        <Controller
                            name="code"
                            control={control}
                            rules={{ required: 'Code is required' }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Department Code"
                                    placeholder="e.g. HR, ENG, SALES"
                                    fullWidth
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose} color="inherit">Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        disabled={submitting}
                    >
                        {submitting ? <CircularProgress size={24} /> : 'Create Department'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};