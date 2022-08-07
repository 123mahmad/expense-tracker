import { Delete, Done, Edit } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Container } from '@mui/system'
import React, { useContext, useState } from 'react'
import { Context } from '../App'
import { v4 as uuidv4 } from 'uuid';

export const BookTitle = () => {
  let {library, setLibrary, currentBook, setCurrentBook, transactions, setTransactions} = useContext(Context);
  let [lockName, setLockName] = useState(true)

  function handleEditButton() {
    setLockName(false);
  };

  function handleDoneButton(e) {
    setLockName(true);
  };

  function handleChange(e) {
    setCurrentBook({...currentBook, 'name': e.target.value});
    let newLibrary = library.filter((book)=>{
      return book.id !== currentBook.id;
    })
    setLibrary([...newLibrary, currentBook]);
  };
  
  function handleDelete() {
    let newLibrary = library.filter((book)=>{
      return book.id !== currentBook.id;
    });
    if (newLibrary.length > 0) {
      setLibrary(newLibrary);
      setCurrentBook(newLibrary[0])};
    if (newLibrary.length === 0) {
      let identity = uuidv4();
      setLibrary([{'id':identity, 'name':'New Book'}]);
      setCurrentBook({'id':identity, 'name':'New Book'});
    };
    let newTransactions = transactions.filter((transaction)=>{
      return transaction.bookId !== currentBook.id;
    });
    setTransactions(newTransactions);    
  };

  return (
    <Container>
      <h3>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                {lockName && <IconButton onClick={handleEditButton}><Edit/></IconButton>}
                {!lockName && <IconButton onClick={handleDoneButton}><Done/></IconButton>}
                <IconButton onClick={handleDelete}><Delete/></IconButton>
              </InputAdornment>
            )
          }}
          disabled={lockName ? true : false}
          value={currentBook.name}
          onChange={handleChange}
        />
      </h3>
    </Container>
  )
}
