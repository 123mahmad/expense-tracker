import { Container, FormControl, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useContext } from 'react'
import { AddInflow } from './AddInflow';
import { Context } from '../App';
import { AddOutflow } from './AddOutFlow';

export const AddTransaction = () => {

  let { transaction, setTransaction} = useContext(Context);

  function handleChange(e) {
    let value = e.target.value;
    setTransaction({...transaction, 'moneyFlow': value})
  }

  return (
    <Container>
      <h3>Add New Transaction</h3>
      <FormControl>
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
      </FormControl>
      {transaction.moneyFlow === 'in' && <AddInflow/>}
      {transaction.moneyFlow === 'out' && <AddOutflow/>}
    </Container>
  )
}
