import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Button, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, IconButton, CircularProgress
} from '@mui/material';
import { Add as AddIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { CreateProjectDialog } from '../components/CreateProjectDialog';
import { StatusChip } from '../components/StatusChip';

export const ProjectDashboard: React.FC = () => {
    const { projects, departments, loading, fetchProjects, createProject } = useProjects();
    const [isCreateOpen, setCreateOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const getDepartmentName = (id?: string) => {
        if (!id) return 'N/A';
        const dept = departments.find(d => d.id === id);
        return dept ? dept.name : 'Unknown';
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Projects Dashboard</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setCreateOpen(true)}
                >
                    New Project
                </Button>
            </Box>

            {loading && projects.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper} elevation={2}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'grey.50' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Code</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Budget</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map((p) => (
                                <TableRow key={p.id} hover>
                                    <TableCell>{p.code}</TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>{p.name}</TableCell>
                                    <TableCell>
                                        <StatusChip status={p.status!} type="PROJECT" />
                                    </TableCell>
                                    <TableCell>
                                        {p.budgetAmount
                                            ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p.budgetAmount)
                                            : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {getDepartmentName(p.departmentId)}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            onClick={() => navigate(`/projects/${p.id}`)}
                                        >
                                            <ViewIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <CreateProjectDialog
                open={isCreateOpen}
                onClose={() => setCreateOpen(false)}
                onSubmit={createProject}
                departments={departments}
            />
        </Box>
    );
};