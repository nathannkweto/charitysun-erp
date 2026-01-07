import { Paper, Chip } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type JournalEntryDTO } from '../../../client';

interface JournalEntryTableProps {
    entries: JournalEntryDTO[];
    loading: boolean;
}

const JournalEntryTable = ({ entries, loading }: JournalEntryTableProps) => {
    const columns: GridColDef<JournalEntryDTO>[] = [
        {
            field: 'id',
            headerName: 'Entry ID',
            width: 150,
            valueGetter: (value: string) => value?.slice(0, 8)
        },
        {
            field: 'transactionDate',
            headerName: 'Date',
            width: 130,
            valueFormatter: (value: string) => value ? new Date(value).toLocaleDateString() : '-'
        },
        { field: 'description', headerName: 'Description', width: 300 },
        {
            field: 'totalAmount',
            headerName: 'Total',
            width: 150,
            type: 'number',
            headerAlign: 'right',
            align: 'right',
            valueFormatter: (value: number) => {
                if (value == null) return '$0.00';
                return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }).format(value);
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={params.value === 'POSTED' ? 'success' : 'default'}
                    size="small"
                    variant="outlined"
                />
            )
        },
    ];

    return (
        <Paper sx={{ height: 600, width: '100%', borderRadius: 2, overflow: 'hidden' }}>
            <DataGrid
                rows={entries}
                columns={columns}
                loading={loading}
                disableRowSelectionOnClick
                getRowId={(row) => row.id || `temp-${Math.random()}`}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10, page: 0 } },
                    sorting: { sortModel: [{ field: 'transactionDate', sort: 'desc' }] }
                }}
                pageSizeOptions={[10, 25, 50]}
                sx={{
                    border: 0,
                    '& .MuiDataGrid-cell:focus': { outline: 'none' }
                }}
            />
        </Paper>
    );
};

export default JournalEntryTable;