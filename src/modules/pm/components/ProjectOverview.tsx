import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { Assignment, Groups } from '@mui/icons-material';

interface Props {
    activeProjects: number;
    totalEmployees: number;
}

export const ProjectOverview: React.FC<Props> = ({ activeProjects, totalEmployees }) => {
    return (
        <Card sx={{ height: '100%', bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Assignment sx={{ mr: 1 }} /> Operations
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" fontWeight="bold">
                                {activeProjects}
                            </Typography>
                            <Typography variant="body2">Active Projects</Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Box sx={{ textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.3)' }}>
                            <Typography variant="h3" fontWeight="bold">
                                {totalEmployees}
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Groups fontSize="small" sx={{ mr: 0.5 }} /> Staff
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};