import { Button, ButtonGroup, Container, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AddTransactionDetails } from './AddTransactionDetails';
import { Context } from '../App';
import { Close } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { updateTransaction, uploadTransaction } from '../firebase';

export const AddTransaction = () => {

  let { user, emptyTransaction, transaction, setTransaction, currentBook, editTransMode, setEditTransMode} = useContext(Context);

  function handleChange(e) {
    let value = e.target.value;
    setTransaction({...transaction, 'moneyFlow': value})
  }

  function handelCancellation() {
    setTransaction(emptyTransaction);
    setEditTransMode(false);
  };

  function handleSubmission() {
    if (!editTransMode) {
      let identity = uuidv4();
      uploadTransaction(user, identity, currentBook.id, transaction.moneyFlow, transaction.amount, transaction.name, transaction.details);
    } else if (editTransMode) {
      let identity = transaction.id;
      updateTransaction(identity, transaction.moneyFlow, transaction.amount, transaction.name, transaction.details)
      setEditTransMode(false);
    }
    setTransaction(emptyTransaction);
  };

  return (
    <Container>
      {!editTransMode && <Typography>Add New Transaction:</Typography>}
      {editTransMode && <Typography>Edit Transaction:</Typography>}
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
