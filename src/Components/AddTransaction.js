import { Button, ButtonGroup, Container, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AddInOutflow } from './AddInOutflow';
import { Context } from '../App';
import { Close } from '@mui/icons-material';

export const AddTransaction = () => {

  let {transaction, setTransaction, book, setBook} = useContext(Context);

  function handleChange(e) {
    let value = e.target.value;
    setTransaction({...transaction, 'moneyFlow': value})
  }

  function handelCancellation() {
    setTransaction({});
  };

  function handleSubmission() {
    setBook(book.concat({...transaction, 'time': new Date()}));
    setTransaction({});
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
       && <AddInOutflow/>}
    </Container>
  )
}
