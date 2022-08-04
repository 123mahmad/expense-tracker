import { Button, ButtonGroup, Container, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useContext } from 'react'
import { AddInflow } from './AddInflow';
import { Context } from '../App';
import { AddOutflow } from './AddOutFlow';
import { Close } from '@mui/icons-material';

export const AddTransaction = () => {

  let {transaction, setTransaction} = useContext(Context);

  function handleChange(e) {
    let value = e.target.value;
    setTransaction({...transaction, 'moneyFlow': value})
  }

  function handelCancellation() {
    setTransaction({});
  };

  return (
    <Container>
      <h3>Add New Transaction</h3>
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
      </ButtonGroup>
      {transaction.moneyFlow === 'in' && <AddInflow/>}
      {transaction.moneyFlow === 'out' && <AddOutflow/>}
    </Container>
  )
}
