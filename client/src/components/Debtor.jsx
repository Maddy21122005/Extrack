import React from 'react';
import '../styles/debt-cred-card.css';

const Debtor = ({ index, name, amount, onUpdate, onDelete }) => {
  return (
    <div className="debt-card">
      <span className="debt-index">{index}</span>
      <span className="debt-name">{name}</span>
      <span className="debt-amount">₹{amount}</span>
      <div className="debt-actions">
        <button className="paid-btn" onClick={onUpdate}>Paid</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Debtor;
