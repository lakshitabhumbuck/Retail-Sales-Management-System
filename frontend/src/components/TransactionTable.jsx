import React from 'react';
import '../styles/TransactionTable.css';

const TransactionTable = ({ transactions, sortBy, sortOrder, loading, error }) => {
  if (loading) {
    return <div className="table-container"><p className="loading">Loading...</p></div>;
  }

  if (error) {
    return <div className="table-container"><p className="error">Error: {error}</p></div>;
  }

  if (!transactions || transactions.length === 0) {
    return <div className="table-container"><p className="no-results">No transactions found. Try adjusting your filters.</p></div>;
  }

  return (
    <div className="table-container">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Region</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transactionId} className="transaction-row">
              <td className="transaction-id">{transaction.transactionId}</td>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.customerName}</td>
              <td>{transaction.phoneNumber}</td>
              <td>{transaction.gender}</td>
              <td>{transaction.age}</td>
              <td>{transaction.customerRegion}</td>
              <td>{transaction.productCategory}</td>
              <td className="quantity">{transaction.quantity}</td>
              <td className="amount">₹{transaction.finalAmount.toLocaleString()}</td>
              <td>{transaction.paymentMethod}</td>
              <td>
                <span className={`status status-${transaction.orderStatus.toLowerCase()}`}>
                  {transaction.orderStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
