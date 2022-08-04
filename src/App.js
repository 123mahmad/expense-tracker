import './App.css';
import { createContext, useEffect, useState } from 'react';
import { AddTransaction } from './Components/AddTransaction';
import { BookHistory } from './Components/BookHistory';
import { AppBar, Avatar, BottomNavigation, createTheme, IconButton, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Delete, Edit } from '@mui/icons-material';

export let Context = createContext(null);

function App() {
  let [library, setLibrary] = useState({Book0: [{'name':'book0'}], Book1:[{'name':'book1'}], Book2:[{'name':'book2'}], Book3:[{'name':'book3'}]});
  let [currentBookName, setCurrentBookName] = useState('Book0')
  let [book, setBook] = useState(library.Book0);
  let [transaction, setTransaction] = useState({
    id: '',
    time: '',
    moneyFlow: '',
    amount: '',
    name: '',
    details: ''
  });

  let contextPayload = {
    book,
    setBook,
    transaction,
    setTransaction
  };

  useEffect(() => {
    setLibrary({...library, [currentBookName]: book})
    // eslint-disable-next-line
  },[currentBookName, book])

  function handleChange(e) {
    let value = e.target.value;
    setCurrentBookName(value);
    let currentBook = library[value];  
    setBook(currentBook);
  }

  return (
    <Context.Provider value={contextPayload}>
      <Box className="App">
        <AppBar position='static'>
          <Toolbar sx={{justifyContent: 'center'}}>
            <Typography sx={{marginRight: 'auto'}}>Expense Tracker</Typography>
            <Select labelId='selectBook' value={currentBookName} onChange={handleChange}>
              {Object.keys(library).map((bookName, index) => {
                  return <MenuItem key={index} value={bookName}>{bookName}</MenuItem>
              })}
            </Select>
            <Avatar/>
          </Toolbar>
        </AppBar>
        <h3>
          {currentBookName}
          {/* <Edit/> */}
          <IconButton><Edit/></IconButton>
          <IconButton><Delete/></IconButton>
        </h3>
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
