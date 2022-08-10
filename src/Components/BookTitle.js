import { Add, Delete, Done, Edit } from '@mui/icons-material'
import { IconButton, InputAdornment, MenuItem, Select, TextField } from '@mui/material'
import { Container } from '@mui/system'
import React, { useContext, useState } from 'react'
import { Context } from '../App'
import { v4 as uuidv4 } from 'uuid';
import { deleteBook, updateBook, uploadBook } from '../firebase'

export const BookTitle = ({user}) => {
  let [updateField, setUpdateField] = useState('')
  let {library, currentBook, setCurrentBook } = useContext(Context);
  let [lockName, setLockName] = useState(true);

  function handleNew() {
    let identity = uuidv4();
    uploadBook(user, identity, 'New Book');
  };

  function handleChange(e) {
    let newBook = library.find(book=>{
      return book.name === e.target.value;
    })
    setCurrentBook(newBook);
  };
  
  function handleEditButton() {
    setLockName(false);
    setUpdateField(currentBook.name);
  };

  function handleDoneButton(e) {
    setLockName(true);
    updateBook(currentBook.id, updateField);
  };

  function handleNameChange(e) {
    setUpdateField(e.target.value);
  };
  
  function handleDelete() {
    deleteBook(currentBook.id);
  };

  return (
    <Container>
      {!currentBook  && <h3>
        <IconButton onClick={handleNew}><Add/>Create New</IconButton>
      </h3>}
      {currentBook && <h3>
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
          value={updateField}
          onChange={handleNameChange}
        />}
        {lockName && <IconButton onClick={handleEditButton}><Edit/></IconButton>}
        {lockName && <IconButton onClick={handleDelete}><Delete/></IconButton>}
      </h3>}
    </Container>
  )
}
