import './App.css';
import { createContext, useEffect, useState } from 'react';
import { AddTransaction } from './Components/AddTransaction';
import { BookHistory } from './Components/BookHistory';
import { AppBar, Avatar, BottomNavigation, createTheme, IconButton, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BookTitle } from './Components/BookTitle';
import initTransactions from './sample.json'
import { Add } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

function getLibrary() {
  let identity = uuidv4();
  let userLibrary = [{'id':identity, 'name':'New Book'}];
  userLibrary = [{'id':1, 'name':'first'},{'id':2, 'name':'second'},{'id':3, 'name':'third'}];
  return userLibrary;
};

function getBook(library) {
  if (library && library.length !== 0) {return library[0]}
  return null;
};

function getTransactions() {
  let userTransactions = [];
  userTransactions = initTransactions;
  return userTransactions;
};

let emptyTransaction = {
  id: '',
  bookId: '',
  time: '',
  moneyFlow: '',
  amount: '',
  name: '',
  details: ''
};

export let Context = createContext(null);

function App() {
  
  let [library, setLibrary] = useState(getLibrary);
  let [currentBook, setCurrentBook] = useState(getBook(library))
  let [transactions, setTransactions] = useState(getTransactions);
  let [transaction, setTransaction] = useState(emptyTransaction);

  let contextPayload = {
    emptyTransaction,
    library,
    setLibrary,
    currentBook,
    setCurrentBook,
    transactions,
    setTransactions,
    transaction,
    setTransaction
  };

  function handleChange(e) {
    let newBook = library.find(book=>{
      return book.name === e.target.value;
    })
    setCurrentBook(newBook);
  };

  function handleNew() {
    let identity = uuidv4();
    setLibrary([...library, {'id':identity, 'name':'New Book'}]);
    setCurrentBook({'id':identity, 'name':'New Book'});
  };

  useEffect(()=>{
    let newLibrary = library.filter((book)=>{
      return book.id !== currentBook.id;
    })
    setLibrary([...newLibrary, currentBook]);
    // eslint-disable-next-line
  },[currentBook])

  return (
    <Context.Provider value={contextPayload}>
      <Box className="App">
        <AppBar position='static'>
          <Toolbar sx={{justifyContent: 'center'}}>
            <Typography sx={{marginRight: 'auto'}}>Expense Tracker</Typography>
            <Select labelId='selectBook' value={currentBook.name} onChange={handleChange}>
              {library.map((book)=>{
                return <MenuItem key={book.id} value={book.name}>{book.name}</MenuItem>
              })}
            </Select>
            <IconButton onClick={handleNew}><Add/>New</IconButton>
            <Avatar sx={{marginLeft: '24px'}}/>
          </Toolbar>
        </AppBar>
        <BookTitle/>
        <AddTransaction/>
        <BookHistory/>
        <BottomNavigation
          sx={{width: '100vw',
          backgroundColor: createTheme().palette.primary.main}}
        >
        </BottomNavigation>
      </Box>
    </Context.Provider>
  );
}

export default App;
