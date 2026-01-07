import { useEffect, useState } from 'react';
import {
    Box, Button, Card, CardContent, Chip, Container, Fab, Grid,
    IconButton, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, useMediaQuery, useTheme, Alert
} from '@mui/material';
import { Add, Edit, Email, Person } from '@mui/icons-material';

import { useEmployees } from '../hooks/useEmployees';
import { useOrganization } from '../hooks/useOrganization';
import { EmployeeDialog, type EmployeeFormInputs } from '../components/EmployeeDialog';
import { type EmployeeDTO, type EmployeeCreateRequest, type EmployeeUpdateRequest } from '../../../client';

type ExtendedEmployeeDTO = EmployeeDTO & { employeeCode?: string };

type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

export const EmployeeDirectory = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { employees, loading, fetchEmployees, createEmployee, updateEmployee } = useEmployees();
    const { departments, jobPositions } = useOrganization();

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDTO | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const handleCreate = () => {
        setSelectedEmployee(null);
        setDialogOpen(true);
    };

    const handleEdit = (emp: EmployeeDTO) => {
        setSelectedEmployee(emp);
        setDialogOpen(true);
    };

    const handleSubmit = async (data: EmployeeFormInputs) => {
        // Convert Dayjs to string for API
        const dateStr = data.dateOfJoining ? data.dateOfJoining.format('YYYY-MM-DD') : '';

        if (selectedEmployee && selectedEmployee.id) {
            // Update
            const updateReq: EmployeeUpdateRequest = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                departmentId: data.departmentId,
                jobPositionId: data.jobPositionId,
            };
            await updateEmployee(selectedEmployee.id, updateReq);
            setSuccessMessage(`Updated profile for ${data.firstName} ${data.lastName}`);
        } else {
            const createReq: EmployeeCreateRequest = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                departmentId: data.departmentId,
                jobPositionId: data.jobPositionId,
                dateOfJoining: dateStr,
            };
            const result = await createEmployee(createReq) as ExtendedEmployeeDTO;
            setSuccessMessage(`Employee Onboarded! System ID Generated: ${result.employeeCode || 'N/A'}`);
        }
        setDialogOpen(false);
        setTimeout(() => setSuccessMessage(null), 6000);
    };

    const getStatusChip = (status: string | undefined) => {
        if (!status) return <Chip label="UNKNOWN" size="small" />;

        const safeStatus = status as string;
        const colors: Record<string, ChipColor> = {
            'ACTIVE': 'success',
            'INACTIVE': 'default',
            'ON_LEAVE': 'warning'
        };

        return (
            <Chip
                label={safeStatus.replace('_', ' ')}
                color={colors[safeStatus] || 'default'}
                size="small"
            />
        );
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="800">Employee Directory</Typography>
                {!isMobile && (
                    <Button variant="contained" startIcon={<Add />} onClick={handleCreate}>
                        Add Employee
                    </Button>
                )}
            </Box>

            {successMessage && (
                <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMessage(null)}>
                    {successMessage}
                </Alert>
            )}

            {!isMobile && (
                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, border: '1px solid #e0e0e0' }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'background.default' }}>
                            <TableRow>
                                <TableCell>ID Code</TableCell>
                                <TableCell>Employee Name</TableCell>
                                <TableCell>Job Title</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.map((emp) => {
                                const extendedEmp = emp as ExtendedEmployeeDTO;
                                return (
                                    <TableRow key={emp.id} hover>
                                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                                            {extendedEmp.employeeCode || '---'}
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Box sx={{ mr: 2, bgcolor: 'primary.light', color: 'primary.main', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Person fontSize="small" />
                                                </Box>
                                                <Box>
                                                    <Typography variant="body2" fontWeight="600">
                                                        {emp.lastName}, {emp.firstName}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{emp.jobTitle}</TableCell>
                                        <TableCell>{emp.departmentName}</TableCell>
                                        <TableCell>{emp.email}</TableCell>
                                        <TableCell>{getStatusChip(emp.status?.toString())}</TableCell>
                                        <TableCell align="right">
                                            <IconButton size="small" onClick={() => handleEdit(emp)}>
                                                <Edit fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {isMobile && (
                <Grid container spacing={2}>
                    {employees.map((emp) => {
                        const extendedEmp = emp as ExtendedEmployeeDTO;
                        return (
                            <Grid size={{ xs: 12 }} key={emp.id}>
                                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                            <Typography variant="h6">{emp.firstName} {emp.lastName}</Typography>
                                            {getStatusChip(emp.status?.toString())}
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            {extendedEmp.employeeCode} • {emp.jobTitle}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                                            <Email fontSize="small" color="action" />
                                            <Typography variant="body2">{emp.email}</Typography>
                                        </Box>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            sx={{ mt: 2 }}
                                            onClick={() => handleEdit(emp)}
                                        >
                                            Edit Profile
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}

            {isMobile && (
                <Fab
                    color="primary"
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    onClick={handleCreate}
                >
                    <Add />
                </Fab>
            )}

            <EmployeeDialog
                open={isDialogOpen}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleSubmit}
                initialData={selectedEmployee}
                departments={departments}
                jobPositions={jobPositions}
                loading={loading}
            />
        </Container>
    );
};