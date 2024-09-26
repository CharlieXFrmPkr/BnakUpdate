import React, { useState, useEffect } from 'react';
import Deposit from './Deposit'; 
import Withdraw from './Withdraw'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Transaction() {
  // Retrieve the username at the top level of the component
  const username = localStorage.getItem('username');
  const [view, setView] = useState('Deposit');
  const [transactions, setTransactions] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [eTransferEnabled, setETransferEnabled] = useState(false);
  const [eTransferForm, setETransferForm] = useState({
    from: '',
    to: '',
    amount: ''
  });

  const BIN_ID = '66f3173ce41b4d34e43667e7'; // Replace with your JSON bin ID
  const API_KEY = '$2a$10$rZco98boEysxK6P/C.LxN.hu8quzE4O0V9X3pi2d5j8DKWDqONdPa'; // Replace with your JSON bin API key

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': API_KEY
          }
        });
        const data = await response.json();
        const allTransactions = data.record.transactions || [];
        
        // Filter transactions for the logged-in user
        const userTransactions = allTransactions.filter(transaction => transaction.username === username);
        setUserTransactions(userTransactions);

        // Calculate balance based on the user's transactions
        const userBalance = userTransactions.reduce((acc, transaction) => {
          return transaction.type === 'Deposit' ? acc + transaction.amount : acc - transaction.amount;
        }, 0);
        
        setBalance(userBalance);  // Set balance for the logged-in user based on transactions
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [BIN_ID, API_KEY, username]);

  const saveTransaction = async (transaction) => {
    try {
      // First, fetch the existing transactions from the bin
      const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch existing transactions');
      }
  
      const data = await response.json();
      const existingTransactions = data.record.transactions || [];
  
      // Append the new transaction to the existing transactions
      const updatedTransactions = [...existingTransactions, transaction];
      setTransactions(updatedTransactions); // Update local state as well
  
      // Now save the updated transactions back to the bin
      const saveResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY,
        },
        body: JSON.stringify({ transactions: updatedTransactions }),
      });
  
      if (!saveResponse.ok) {
        throw new Error('Failed to save transaction');
      }
  
      const responseData = await saveResponse.json();
      console.log('Transaction saved successfully:', responseData);
  
      // Update the userTransactions after saving the new transaction
      const updatedUserTransactions = updatedTransactions.filter(t => t.username === username);
      setUserTransactions(updatedUserTransactions);
  
    } catch (error) {
      console.error('Error saving transaction:', error);
      // Rollback on error
      setTransactions(prevTransactions => prevTransactions.filter(t => t !== transaction));
      setUserTransactions(prevTransactions => prevTransactions.filter(t => t !== transaction));
    }
  };
  
  
  // Adjusted handlers
  const handleDepositSubmit = async (data) => {
    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Invalid deposit amount');
      return;
    }
  
    const newBalance = balance + amount;
    setBalance(newBalance);
    const transaction = { type: 'Deposit', username, amount, date: new Date().toLocaleDateString() };
    await saveTransaction(transaction);
    setETransferEnabled(true);
  };
  
  const handleWithdrawSubmit = async (data) => {
    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Invalid withdrawal amount');
      return;
    }
  
    if (amount > balance) {
      alert('Insufficient balance');
      return;
    }
  
    const newBalance = balance - amount;
    setBalance(newBalance);
    const transaction = { type: 'Withdrawal', username, amount, date: new Date().toLocaleDateString() };
    await saveTransaction(transaction);
  };
  const handleETransferChange = (e) => {
    const { name, value } = e.target;
    setETransferForm({ ...eTransferForm, [name]: value });
  };

  const handleETransferSubmit = () => {
    const { from, to, amount } = eTransferForm;
    const transferAmount = parseFloat(amount);

    if (isNaN(transferAmount) || transferAmount <= 0) {
      alert('Invalid transfer amount');
      return;
    }

    if (transferAmount > balance) {
      alert('Insufficient balance for transfer');
      return;
    }

    const newBalance = balance - transferAmount;
    setBalance(newBalance);
    const transaction = { 
      type: 'E-Transfer', 
      username, // Ensure username is defined here
      amount: transferAmount, 
      from, 
      to, 
      date: new Date().toLocaleDateString() 
    };
    saveTransaction(transaction);

    setETransferForm({
      from: '',
      to: '',
      amount: ''
    });
  };

  const buttonStyle = {
    backgroundColor: 'black',
    color: 'goldenrod',
    border: '1px solid goldenrod',
    marginRight: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease' 
  };

  const buttonStyleActive = {
    ...buttonStyle,
    backgroundColor: 'goldenrod',
    color: 'black',
    fontWeight: 'bold'
  };

  const inputStyle = {
    backgroundColor: '#333', 
    color: 'white', 
    border: '1px solid goldenrod', 
    padding: '10px'
  };

  return (
    <div className="transaction-container">
      <h2>Transaction for {username}</h2>
      <h3>Current Balance: ${balance.toFixed(2)}</h3>
      <div className="transaction-buttons">
        <button style={view === 'Deposit' ? buttonStyleActive : buttonStyle} onClick={() => setView('Deposit')}>Deposit</button>
        <button style={view === 'Withdraw' ? buttonStyleActive : buttonStyle} onClick={() => setView('Withdraw')}>Withdraw</button>
        {eTransferEnabled && (
          <button style={buttonStyle} onClick={() => setView('E-Transfer')}>E-Transfer</button>
        )}
      </div>

      {view === 'Deposit' && <Deposit onSubmit={handleDepositSubmit} />}
      {view === 'Withdraw' && <Withdraw onSubmit={handleWithdrawSubmit} />}
      {view === 'E-Transfer' && (
        <div>
          <h4>E-Transfer</h4>
          <input type="text" name="from" value={eTransferForm.from} onChange={handleETransferChange} placeholder="From" style={inputStyle} />
          <input type="text" name="to" value={eTransferForm.to} onChange={handleETransferChange} placeholder="To" style={inputStyle} />
          <input type="number" name="amount" value={eTransferForm.amount} onChange={handleETransferChange} placeholder="Amount" style={inputStyle} />
          <button onClick={handleETransferSubmit}>Send</button>
        </div>
      )}

      <h3>Transaction History</h3>
      <ul>
        {userTransactions.map((transaction, index) => (
          <li key={index}>{transaction.type} of ${transaction.amount} on {transaction.date} by {transaction.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Transaction;
