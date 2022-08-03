import { Button, FormControl, Input, InputLabel } from '@mui/material'
import { Container } from '@mui/system';
import React, { useContext } from 'react'
import { Context } from '../App';

export const AddOutflow = () => {

  let {transaction, setTransaction, book, setBook} = useContext(Context);

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setTransaction({...transaction, [name]: value})
  };

  function handleSubmission() {
    setBook(book.concat(transaction));
  };

  return (
    <Container>
      <h5>(Outflow)</h5>
      <div>
        <FormControl>
          <InputLabel htmlFor='name'>To:</InputLabel>
          <Input onChange={handleChange} name='name' id='name' type='text' value={transaction.name}></Input>
        </FormControl>
      </div>
      <br></br>
      <div>
        <FormControl>
          <InputLabel htmlFor='details'>Details:</InputLabel>
          <Input onChange={handleChange} name='details' id='details' type='text' value={transaction.details}></Input>
        </FormControl>
      </div>
      <br></br>
      <div>
        <FormControl>
          <InputLabel htmlFor='amount'>Amount:</InputLabel>
          <Input onChange={handleChange} name='amount' id='amount' type='number' value={transaction.amount}></Input>
        </FormControl>
      </div>
      <br></br>
      <Button variant='contained' onClick={handleSubmission}>Submit</Button>
    </Container>
  )
}

