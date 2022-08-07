import { Button, ButtonGroup, Container, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AddTransactionDetails } from './AddTransactionDetails';
import { Context } from '../App';
import { Close } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

export const AddTransaction = () => {

  let {emptyTransaction, transaction, setTransaction, transactions, setTransactions, currentBook} = useContext(Context);

  function handleChange(e) {
    let value = e.target.value;
    setTransaction({...transaction, 'moneyFlow': value})
  }

  function handelCancellation() {
    setTransaction(emptyTransaction);
  };

  function handleSubmission() {
    setTransactions([...transactions, {...transaction, 'id':uuidv4(), 'bookId':currentBook.id, 'time': new Date()}]);
    setTransaction(emptyTransaction);
  };

  return (
    <Container>
      <Typography>Add New Transaction:</Typography>
      <ButtonGroup>
        <ToggleButtonGroup
          value={transaction.moneyFlow}
          exclusive
          onChange={handleChange}
          >
          <ToggleButton value={'in'}>
            IN
          </ToggleButton>
          <ToggleButton value={'out'}>
            OUT
          </ToggleButton>
        </ToggleButtonGroup>
        {(transaction.moneyFlow === 'in' || transaction.moneyFlow === 'out')
         && <Button color='warning' onClick={handelCancellation}><Close/></Button>}
        {(transaction.moneyFlow === 'in' || transaction.moneyFlow === 'out')
         && <Button color='success' onClick={handleSubmission}>Submit</Button>}
      </ButtonGroup>
      {(transaction.moneyFlow === 'in' || transaction.moneyFlow === 'out')
       && <AddTransactionDetails/>}
    </Container>
  )
}
