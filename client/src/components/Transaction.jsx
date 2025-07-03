import React from 'react';
import '../styles/transcard.css';

const Transaction = ({ transNo, dateTime, amount, category, description, onDelete, showDelete }) => {
  return (
    <div className="transaction-card">
      <span>{transNo}.</span>
      <span>{dateTime}</span>
      <span>₹{amount}</span>
      <span>{category}</span>
      <span>{description}</span>
      {showDelete && (
        <button onClick={onDelete}>Delete</button>
      )}
    </div>
  );
};

export default Transaction;