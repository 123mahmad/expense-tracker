import './App.css';
import { createContext, useEffect, useState } from 'react';
import { AddTransaction } from './Components/AddTransaction';
import { BookHistory } from './Components/BookHistory';
import { AppBar, Avatar, BottomNavigation, createTheme, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BookTitle } from './Components/BookTitle';
import initTransactions from './sample.json'
import { v4 as uuidv4 } from 'uuid';
import { auth, signIn, signOutUser, getProfilePicUrl} from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


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
  let [user, loading, error] = useAuthState(auth);

  console.log(user, loading, error);

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

  useEffect(()=>{

  })

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
            {!user && <IconButton onClick={signIn}><Avatar sx={{marginRight: '10px'}}/>Sign In</IconButton>}
            {user && <Typography sx={{marginLeft: '10px'}}>{user.displayName}</Typography>}
            {user && <IconButton onClick={signOutUser}><Avatar src={`${getProfilePicUrl}`} sx={{marginRight: '10px'}}/>Sign Out</IconButton>}
          </Toolbar>
        </AppBar>
        {user && <BookTitle user={user}/>}
        {user && <AddTransaction user={user}/>}
        {user && <BookHistory user={user}/>}
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
