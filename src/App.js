import './App.css';
import { createContext, useEffect, useState } from 'react';
import { AddTransaction } from './Components/AddTransaction';
import { BookHistory } from './Components/BookHistory';
import { BottomNavigation, createTheme } from '@mui/material';
import { Box } from '@mui/system';
import { BookTitle } from './Components/BookTitle';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { TopBar } from './Components/TopBar';
import { LeftBar } from './Components/LeftBar';

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
  let [editTransMode, setEditTransMode] = useState(false);
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
    setTransaction,
    editTransMode,
    setEditTransMode,
    user,
  };

  useEffect(()=>{
    if (user && transactions) {

      let booksQuery = query(
        collection(db, 'books'),
        where("uid", "==", user.uid),
        orderBy('time', 'desc'),
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
        orderBy('time', 'desc'),
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
        <TopBar/>
        <LeftBar/>
        {(!user && loading) && <h3>...Checking Current User</h3>}
        {(!user) && <h3>Not Signed In</h3>}
        {(user && library === undefined) && <h3>...Loading User Data</h3>}
        {(user && library) && <BookTitle/>}
        {(user && currentBook) && <AddTransaction/>}
        {(user && currentBook) && <BookHistory/>}
        <BottomNavigation
          sx={{width: '100vw',
          backgroundColor: createTheme().palette.primary.main,
          zIndex: (theme) => theme.zIndex.drawer + 1}}
        >
        </BottomNavigation>
      </Box>
    </Context.Provider>
  );
}

export default App;
