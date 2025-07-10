import React, { useEffect, useState } from "react";
import Transaction from "../components/Transaction";
import "../styles/transpage.css";
import { getTransactions, deleteTransaction } from "../api/transactions";

const CATEGORY_KEYS = ["FOOD", "TRAVEL", "SHOPPING", "RENT", "BILLS", "OTHER"];

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filter inputs (controlled)
  const [categoryInput, setCategoryInput] = useState("");
  const [startDateInput, setStartDateInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");

  // Active filters (used for API calls)
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  const fetchData = async () => {
    setLoading(true);
    const start = Date.now();
    try {
      const query = {
        page,
        ...(filters.category && { category: filters.category }),
        ...(filters.startDate && { startDate: `${filters.startDate}T00:00:00.000Z` }),
        ...(filters.endDate && { endDate: `${filters.endDate}T23:59:59.999Z` }),
      };
      const res = await getTransactions(query);
      setTransactions(res.data.transactions);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
    const elapsed = Date.now() - start;
    const delay = Math.max(400 - elapsed, 0);
    setTimeout(() => setLoading(false), delay);
  };

  // Initial render and whenever filters or page changes
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page]);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      fetchData();
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  const handleApplyFilters = () => {
    setPage(1);
    setFilters({
      category: categoryInput,
      startDate: startDateInput,
      endDate: endDateInput,
    });
  };

  const handleResetFilters = () => {
    setCategoryInput("");
    setStartDateInput("");
    setEndDateInput("");
    setPage(1);
    setFilters({ category: "", startDate: "", endDate: "" });
  };

  return (
    <div className="trans-root">
      <div className="transaction-page">
        <div className="transaction-header">
          <h2>All Transactions</h2>
        </div>

        {/* Filter Section */}
        <div className="transaction-filters">
          <label>From :</label>
          <input
            type="date"
            value={startDateInput}
            onChange={(e) => setStartDateInput(e.target.value)}
            placeholder="Start Date"
          />

          <label>To :</label>
          <input
            type="date"
            value={endDateInput}
            onChange={(e) => setEndDateInput(e.target.value)}
            placeholder="End Date"
          />
          <select
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
          >
            <option value="">All Categories</option>
            {CATEGORY_KEYS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button className="reset-btn" onClick={handleApplyFilters}>
            Apply
          </button>

          <button className="reset-btn" onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>

        {/* Headings */}
        <div className="transaction-headings">
          <span>Trans. No</span>
          <span>Date & Time</span>
          <span>Amount</span>
          <span>Category</span>
          <span>Description</span>
          <span>Actions</span>
        </div>

        {/* List */}
        <div className="scroll-container">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            transactions.map((txn, i) => (
              <Transaction
                key={txn._id}
                transNo={(page - 1) * 10 + i + 1}
                dateTime={txn.dateTime}
                amount={txn.amount}
                category={txn.category}
                description={txn.description}
                onDelete={() => handleDelete(txn._id)}
                showDelete={true}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="pagination-buttons">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
