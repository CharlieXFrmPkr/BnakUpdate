import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Deposit({ onSubmit }) {
  const [amount, setAmount] = useState('');

  const handleDeposit = (e) => {
    e.preventDefault();
    onSubmit({ amount });
    setAmount('');
  };

  const handleCancel = () => {
    setAmount('');
  };

  return (
    <div className="container">
      <h3>Deposit</h3>
      <form onSubmit={handleDeposit}>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="mybtn btn btn-primary">
          Deposit
        </button>
        <button type="button" className="mybtn btn btn-secondary ml-2" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Deposit;
