import React, { useEffect, useState } from "react";
import "../styles/dash.css";
import Transaction from "../components/Transaction";
import PieChart from "../components/PieChart";
import {
  createTransaction,
  getTransactions,
  getTransactionStats,
} from "../api/transactions";
import { getUserProfile } from "../api/user";
import dayjs from "dayjs";

const CATEGORY_KEYS = ["FOOD", "TRAVEL", "SHOPPING", "RENT", "BILLS", "OTHER"];
const CATEGORY_COLORS = [
  "#a8dadc", // Soft Aqua
  "#ffb4a2", // Light Coral
  "#ffe066", // Warm Soft Yellow
  "#b5ead7", // Mint Green
  "#cdb4db", // Lavender Mauve
  "#fbc4ab", // Soft Apricot
];

const Dashboard = () => {
  const [amount, setAmount] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions({ limit: 5 });
      setTransactions(res.data.transactions);
    } catch (err) {
      console.error("Fetch transactions error:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await getTransactionStats();
      setStats(res.data);
    } catch (err) {
      console.error("Stats fetch error:", err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await getUserProfile();
      setUser(res.data.user);
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchTransactions();
    fetchStats();
  }, []);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const finalDateTime = dateTime || new Date().toISOString();

    try {
      const newTransaction = {
        amount,
        dateTime: finalDateTime,
        category,
        description,
      };
      await createTransaction(newTransaction);
      setAmount("");
      setDateTime("");
      setCategory("");
      setDescription("");
      fetchTransactions();
      fetchStats();
    } catch (err) {
      console.error(
        "Add Transaction Error:",
        err.response?.data?.message || err.message
      );
    }
  };

  const pieData = {
    labels: CATEGORY_KEYS,
    datasets: [
      {
        data: CATEGORY_KEYS.map((key) => stats?.categories?.[key] || 0),
        backgroundColor: CATEGORY_COLORS,
        hoverOffset: 6,
      },
    ],
  };

  return (
    <div className="dashboard-root">
      <div className="dash-left">
        {/* Stats */}
        <div className="stats-container">
          <h2>Hello {user?.name || "user"}!</h2>
          <table>
            <tbody>
              <tr>
                <td>
                  Daily <br /> ₹{stats?.daily || 0}
                </td>
                <td>
                  Weekly <br /> ₹{stats?.weekly || 0}
                </td>
                <td>
                  Monthly <br /> ₹{stats?.monthly || 0}
                </td>
                <td>
                  Yearly <br /> ₹{stats?.yearly || 0}
                </td>
                <td>
                  Total <br /> ₹{stats?.total || 0}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Pie Chart and Category Details */}
          <div className="stats-bottom">
            <div className="pie-container">
              <PieChart data={pieData} />
            </div>
        
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="dash-trans-container">
          <h3>Recent Transactions</h3>
          <div className="recent-trans-container">
            {transactions.map((txn, idx) => (
              <Transaction
                key={txn._id}
                transNo={idx + 1}
                dateTime={dayjs(txn.dateTime).format("DD-MM-YY HH:mm")}
                amount={txn.amount}
                category={txn.category}
                description={txn.description}
                showDelete={false}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Create Transaction */}
      <div className="create-trans-container">
        <h3>Add new Transaction</h3>
        <form onSubmit={handleAddTransaction}>
          <label>Enter Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label>
            Enter Date & Time{" "}
            <span style={{ fontWeight: 300 }}>(optional)</span>
          </label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />

          <label>Select Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {CATEGORY_KEYS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label>Enter Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></input>

          <button type="submit">Add new Transaction</button>
        </form>
        <div className="dash-para">Any problem or Suggestion ? <a className="c-link" href="/contact">Contact Us</a></div>
      </div>
    </div>
  );
};

export default Dashboard;
