import { Delete, Edit } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { useContext } from 'react'
import { Context } from '../App'
import { deleteTransaction } from '../firebase';

export const BookHistory = ({user}) => {

  let {transactions, currentBook, setTransaction, editTransMode, setEditTransMode} = useContext(Context);
  
  function editTransaction(id) {
    let editableTransaction = rows.filter((transaction)=>{
      return transaction.id === id 
    });
    setTransaction(editableTransaction[0]);
    setEditTransMode(true);
  };

  let columns = [
    { field: 'time', headerName: 'Time', type:'dateTime', width: 180},
    { field: 'moneyFlow', headerName: 'Flow', type:'singleSelect', width: 65, valueOptions: ['in','out']},
    { field: 'amount', headerName: 'Amount', type: 'number', width: 75},
    { field: 'name', headerName: 'Name', minWidth:150, flex:1},
    { field: 'details', headerName: 'Details', minWidth:200, flex:3},
    { field: 'actions', headerName:'Actions', type:'actions', width:70,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit/>}
          label="Edit"
          disabled={editTransMode}
          onClick={()=>editTransaction(params.row.id)}
        />,
        <GridActionsCellItem
          icon={<Delete/>}
          label="Delete"
          disabled={editTransMode}
          onClick={()=>deleteTransaction(params.row.id)}
        />,
      ],
    },
  ];

  let rows = transactions.filter((transaction)=>{
    return transaction.bookId === currentBook.id;
  });

  function CustomToolbar() {
    return (
      <div>
        <GridToolbarContainer>
          <GridToolbarColumnsButton/>
          <GridToolbarDensitySelector/>
          <GridToolbarFilterButton/>
          <GridToolbarExport
            printOptions={{
              hideFooter: true,
              hideToolbar: true,
              fields: ['time', 'moneyFlow', 'amount', 'name', 'details']
            }}
          />
          <GridToolbarQuickFilter
            sx={{marginLeft: 'auto'}}
          />
        </GridToolbarContainer>
        <Typography>Logged User: {user.displayName} ({user.email})</Typography>
        <Typography>{}</Typography>
      </div>
    );
  };

  return (
    <Container>
      <h5 style={{marginBottom:10}}>Book History</h5>
      <div style={{minHeight: 100, borderRadius:'7px', border:'1px solid rgba(0,0,0,0.3)'}}>
        <DataGrid
          sx={{
            border: 0,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[5, 50, 100, 500, 1000]}
          autoHeight
          components = {{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </Container>
  )
};
