import './App.css';
import { createContext, useState } from 'react';
import { AddTransaction } from './Components/AddTransaction';
import { ListTransaction } from './Components/ListTransaction';

export let Context = createContext(null);

function App() {
  let [book, setBook] = useState([]);
  let [transaction, setTransaction] = useState({
    moneyFlow: '',
    name: '',
    details: '',
    amount: ''
  });

  let contextPayload = {
    book,
    setBook,
    transaction,
    setTransaction
  };

  return (
    <Context.Provider value={contextPayload}>
      <div className="App">
        <h1>Expense Tracker</h1>
        <AddTransaction/>
        <ListTransaction/>
      </div>
    </Context.Provider>
  );
}

export default App;
