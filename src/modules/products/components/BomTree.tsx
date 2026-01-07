import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
} from '@mui/material';
import {
    Inventory2Outlined,
    SubdirectoryArrowRight,
    AttachMoney,
    Layers
} from '@mui/icons-material';
import { type BomDTO } from '../../../client';

interface BomTreeProps {
    bom: BomDTO;
    level?: number;
}

export const BomTree: React.FC<BomTreeProps> = ({ bom, level = 0 }) => {
    const hasComponents = bom.components && bom.components.length > 0;

    return (
        <Box sx={{ pl: level > 0 ? 4 : 0, mt: 1 }}>
            {level === 0 && (
                <Card variant="outlined" sx={{ mb: 2, bgcolor: 'primary.50', borderColor: 'primary.main' }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Inventory2Outlined color="primary" />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {/* Display name if available, fallback to ID */}
                                    {bom.productName || "Root Product"}
                                </Typography>
                                <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                                    {bom.productId}
                                </Typography>
                            </Box>
                        </Stack>
                        <Chip
                            icon={<AttachMoney />}
                            label={bom.totalRolledUpCost?.toFixed(2)}
                            color="primary"
                            variant="filled"
                        />
                    </CardContent>
                </Card>
            )}

            {hasComponents && (
                <Stack spacing={2} sx={{ position: 'relative' }}>
                    <Box sx={{
                        position: 'absolute',
                        left: -16,
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        bgcolor: 'divider'
                    }} />

                    {bom.components!.map((comp, index) => (
                        <Box key={index} sx={{ position: 'relative' }}>
                            {/* Connector Icon */}
                            <SubdirectoryArrowRight sx={{
                                position: 'absolute',
                                left: -24,
                                top: 12,
                                color: 'text.disabled'
                            }} />

                            <Card variant="outlined">
                                <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Layers fontSize="small" color="action" />
                                            <Typography variant="body2" fontWeight="medium">
                                                {comp.sku}
                                            </Typography>
                                            <Chip label={`x${comp.quantity}`} size="small" variant="outlined" />
                                        </Stack>
                                        <Typography variant="body2" color="text.secondary">
                                            ${comp.unitCost?.toFixed(2)}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>

                            {comp.subBom && <BomTree bom={comp.subBom} level={level + 1} />}
                        </Box>
                    ))}
                </Stack>
            )}
        </Box>
    );
};