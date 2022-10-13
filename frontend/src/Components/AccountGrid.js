import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";

const columns = [
    { field: 'name', headerName: 'Название', width: 130 },
    { field: 'okir_inn', headerName: 'ИНН', width: 130 },
    { field: 'okir_kpp', headerName: 'КПП', width: 130 },
  ];

function AccountGrid ({accounts, onSelectAccount}) {

    return (
        <div>
            <div>
                <Typography variant="h6" gutterBottom>Компании</Typography>
            </div>
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={accounts}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onRowClick={onSelectAccount}
            />
            </div>
        </div>
    )
    
}

export default AccountGrid;