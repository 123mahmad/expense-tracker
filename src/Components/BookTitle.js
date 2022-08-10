import { Add, Delete, Done, Edit } from '@mui/icons-material'
import { IconButton, InputAdornment, MenuItem, Select, TextField } from '@mui/material'
import { Container } from '@mui/system'
import React, { useContext, useState } from 'react'
import { Context } from '../App'
import { v4 as uuidv4 } from 'uuid';
import { uploadBook } from '../firebase'

export const BookTitle = ({user}) => {
  
  let {library, setLibrary, currentBook, setCurrentBook, transactions, setTransactions} = useContext(Context);
  let [lockName, setLockName] = useState(true);

  function handleNew() {
    let identity = uuidv4();
    uploadBook(user, identity, 'New Book');
    setLibrary([...library, {'id':identity, 'name':'New Book'}]);
    setCurrentBook({'id':identity, 'name':'New Book'});
  };

  function handleChange(e) {
    let newBook = library.find(book=>{
      return book.name === e.target.value;
    })
    setCurrentBook(newBook);
  };
  
  function handleEditButton() {
    setLockName(false);
  };

  function handleDoneButton(e) {
    setLockName(true);
  };

  function handleNameChange(e) {
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
        {lockName && <IconButton onClick={handleNew}><Add/></IconButton>}
        {lockName && <Select labelId='selectBook' value={currentBook.name} onChange={handleChange}>
          {library.map((book)=>{
            return <MenuItem key={book.id} value={book.name}>{book.name}</MenuItem>
          })}
        </Select>}
        {!lockName && <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleDoneButton}><Done/></IconButton>
              </InputAdornment>
            )
          }}
          disabled={lockName ? true : false}
          value={currentBook.name}
          onChange={handleNameChange}
        />}
        {!lockName && <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleDoneButton}><Done/></IconButton>
              </InputAdornment>
            )
          }}
          disabled={lockName ? true : false}
          value={currentBook.name}
          onChange={handleNameChange}
        />}
        {lockName && <IconButton onClick={handleEditButton}><Edit/></IconButton>}
        {lockName && <IconButton onClick={handleDelete}><Delete/></IconButton>}
      </h3>
    </Container>
  )
}
