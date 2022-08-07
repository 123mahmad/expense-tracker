import { Container } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useContext } from 'react'
import { Context } from '../App'

export const BookHistory = () => {

  let {transactions, currentBook} = useContext(Context);
  
  let columns = [
    { field: 'time', headerName: 'Time', type:'dateTime', flex: 1, maxWidth: 165},
    { field: 'moneyFlow', headerName: 'Flow', type:'singleSelect', flex: 1, maxWidth: 65, valueOptions: ['in','out']},
    { field: 'amount', headerName: 'Amount', type: 'number', flex: 1, maxWidth: 75},
    { field: 'name', headerName: 'Name', flex: 1},
    { field: 'details', headerName: 'Details', flex: 2.5},
  ];

  let rows = transactions.filter((transaction)=>{
    return transaction.bookId === currentBook.id;
  });

  return (
    <Container>
      <h5>Book History</h5>
      <div style={{minHeight: 400, width: '100%'}}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[5, 50, 100, 500, 1000]}
          autoHeight
          components = {{
            Toolbar: GridToolbar,
          }}
          componentsProps = {{
            toolbar: {
              printOptions:
              {
                hideFooter: true,
                hideToolbar: true
              }
            }
          }}
        />
      </div>
    </Container>
  )
}
