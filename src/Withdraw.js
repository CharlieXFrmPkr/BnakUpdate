import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Withdraw({ onSubmit }) {
  const [amount, setAmount] = useState('');

  const handleWithdraw = (e) => {
    e.preventDefault();
    onSubmit({ amount });
    setAmount('');
  };

  const handleCancel = () => {
    setAmount('');
  };

  return (
    <div className="container">
      <h3>Withdraw</h3>
      <form onSubmit={handleWithdraw}>
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
          Withdraw
        </button>
        <button type="button" className="mybtn btn btn-secondary ml-2" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Withdraw;
