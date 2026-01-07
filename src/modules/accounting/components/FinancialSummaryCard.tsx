import { Card, CardContent, Typography, Box } from '@mui/material';

interface FinancialSummaryCardProps {
    title: string;
    amount: number;
    color: string;
}

const FinancialSummaryCard = ({ title, amount, color }: FinancialSummaryCardProps) => {
    return (
        <Card sx={{ borderRadius: 2, borderTop: `4px solid ${color}` }}>
            <CardContent>
                <Typography color="text.secondary" variant="overline" sx={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FinancialSummaryCard;