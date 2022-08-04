import { Container } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useContext } from 'react'
import { Context } from '../App'

export const BookHistory = () => {

  let {book} = useContext(Context);
  //let book = require('../sampleData.json');
  
  let rows = book.map((transaction, index) => {
    return {...transaction, 'id' : index + 1}
  });

  let columns = [
    { field: 'id', headerName: 'Sr.#', type: 'number', flex: 1, maxWidth: 65},
    { field: 'time', headerName: 'Time', type:'dateTime', flex: 1, maxWidth: 165},
    { field: 'moneyFlow', headerName: 'Flow', type:'singleSelect', flex: 1, maxWidth: 65, valueOptions: ['in','out']},
    { field: 'amount', headerName: 'Amount', type: 'number', flex: 1, maxWidth: 75},
    { field: 'name', headerName: 'Name', flex: 1},
    { field: 'details', headerName: 'Details', flex: 2.5},
  ];

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
