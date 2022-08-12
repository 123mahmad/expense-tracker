import './App.css';
import { createContext, useEffect, useState } from 'react';
import { AddTransaction } from './Components/AddTransaction';
import { BookHistory } from './Components/BookHistory';
import { AppBar, Avatar, BottomNavigation, createTheme, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BookTitle } from './Components/BookTitle';
import { auth, signIn, signOutUser, getProfilePicUrl, db} from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

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
  
  let [library, setLibrary] = useState();
  let [currentBook, setCurrentBook] = useState()
  let [transactions, setTransactions] = useState([]);
  let [transaction, setTransaction] = useState(emptyTransaction);
  let [user, loading] = useAuthState(auth);

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
    if (user && transactions) {

      let booksQuery = query(
        collection(db, 'books'),
        where("uid", "==", user.uid),
      );
      onSnapshot(booksQuery, (snaps) => {
        let bookList = [];
        snaps.forEach((doc) => {
          bookList.push(doc.data());
        });
        setLibrary(bookList);
        setCurrentBook(bookList[0]);
      });
      
      let transactionsQuery = query(
        collection(db, 'transactions'),
        where("uid", "==", user.uid),
      );
      onSnapshot(transactionsQuery, (snaps) => {
        let transactionList = [];
        snaps.forEach((doc) => {
          let serverTimestamp = doc.data().time;
          if (serverTimestamp)
          {
            transactionList.push({...doc.data(), 'time': new Date(serverTimestamp.seconds*1000)});
          };
        });
        setTransactions(transactionList);
      });

    };
    // eslint-disable-next-line
  },[user])

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
        {(!user && loading) && <h3>...Checking Current User</h3>}
        {(!user) && <h3>Not Signed In</h3>}
        {(user && library === undefined) && <h3>...Loading User Data</h3>}
        {(user && library) && <BookTitle user={user}/>}
        {(user && currentBook) && <AddTransaction user={user}/>}
        {(user && currentBook) && <BookHistory user={user}/>}
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
