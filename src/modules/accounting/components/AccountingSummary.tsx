import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Alert } from '@mui/material';
import { AttachMoney, TrendingUp, TrendingDown } from '@mui/icons-material';
import { type FinancialSummaryDTO } from '../../../client';

interface Props {
    data?: FinancialSummaryDTO | null;
}

export const AccountingSummary: React.FC<Props> = ({ data }) => {
    if (!data) {
        return (
            <Card sx={{ height: '100%' }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Financials</Typography>
                    <Alert severity="info">
                        You do not have permission to view financial summaries.
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card sx={{ height: '100%', bgcolor: 'success.dark', color: 'white' }}>
            <CardContent>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AttachMoney sx={{ mr: 1 }} /> Financial Summary (YTD)
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                        <Box sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
                                <TrendingUp fontSize="small" sx={{ mr: 0.5 }} /> Revenue
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {data.currency} {data.totalRevenue?.toLocaleString()}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Box sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
                                <TrendingDown fontSize="small" sx={{ mr: 0.5 }} /> Expenses
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {data.currency} {data.totalExpenses?.toLocaleString()}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Box sx={{ mt: 1, pt: 2, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                            <Typography variant="body2">Net Profit</Typography>
                            <Typography variant="h4" fontWeight="bold">
                                {data.currency} {data.netProfit?.toLocaleString()}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};