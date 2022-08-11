import { Button, ButtonGroup, Container, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AddTransactionDetails } from './AddTransactionDetails';
import { Context } from '../App';
import { Close } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { uploadTransaction } from '../firebase';

export const AddTransaction = ({user}) => {

  let {emptyTransaction, transaction, setTransaction, currentBook} = useContext(Context);

  function handleChange(e) {
    let value = e.target.value;
    setTransaction({...transaction, 'moneyFlow': value})
  }

  function handelCancellation() {
    setTransaction(emptyTransaction);
  };

  function handleSubmission() {
    let identity = uuidv4();
    let time = new Date();
    uploadTransaction(user, identity, time, currentBook.id, transaction.moneyFlow, transaction.amount, transaction.name, transaction.details);
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
