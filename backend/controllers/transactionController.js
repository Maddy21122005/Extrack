import Transaction from "../models/transaction.js";

// Helper to parse date ranges
const getDateRange = (type) => {
  const now = new Date();
  let start;

  switch (type) {
    case "daily":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "weekly":
      start = new Date(now.setDate(now.getDate() - 6));
      break;
    case "monthly":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "yearly":
      start = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      start = new Date(0); // epoch
  }

  return { start, end: new Date() };
};

// controllers/transactionController.js
export const getTransactions = async (req, res) => {
  console.log('Query Params:', req.query);
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10, category, startDate, endDate } = req.query;

    const filters = { user: userId };

    if (category) {
      filters.category = category;
    }

    if (startDate || endDate) {
      filters.dateTime = {};
      if (startDate) {
        filters.dateTime.$gte = new Date(startDate);
      }
      if (endDate) {
        filters.dateTime.$lte = new Date(endDate);
      }
    }

    const totalCount = await Transaction.countDocuments(filters);
    const totalPages = Math.ceil(totalCount / limit);

    const transactions = await Transaction.find(filters)
      .sort({ dateTime: -1 }) // newest first
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({ transactions, totalPages });
  } catch (err) {
    console.error("Error in getTransactions:", err);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

// GET /api/transactions?page=1&limit=10
export const getAllTransactions = async (req, res) => {
  try {
    const { category, startDate, endDate, page = 1, limit = 10 } = req.query;

    const query = { user: req.user._id };

    if (category) {
      query.category = category;
    }

    if (startDate || endDate) {
      query.dateTime = {};
      if (startDate) query.dateTime.$gte = new Date(startDate);
      if (endDate) query.dateTime.$lte = new Date(endDate);
    }

    const total = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .sort({ dateTime: -1 }) // most recent first
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      transactions
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};

// POST /api/transactions
export const createTransaction = async (req, res) => {
  try {
    const { amount, dateTime, category, description } = req.body;

    const txn = new Transaction({
      user: req.user._id,
      amount: Number(amount),
      dateTime,
      category,
      description,
    });

    const saved = await txn.save();
    res.status(201).json(saved);
  } catch (err) {
    console.log("Server side error :", err);
    res.status(400).json({ message: "Invalid data!!", err });
  }
};

// DELETE /api/transactions/:id
export const deleteTransaction = async (req, res) => {
  try {
    const txn = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!txn) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/transactions/stats
// server/controllers/transactionController.js

export const getTransactionStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const allTxns = await Transaction.find({ user: userId });

    let stats = {
      daily: 0,
      weekly: 0,
      monthly: 0,
      yearly: 0,
      total: 0,
      categories: {},
    };

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 7);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    for (let txn of allTxns) {
      const amt = txn.amount;
      const time = new Date(txn.dateTime);

      stats.total += amt;

      if (time >= startOfToday) stats.daily += amt;
      if (time >= startOfWeek) stats.weekly += amt;
      if (time >= startOfMonth) stats.monthly += amt;
      if (time >= startOfYear) stats.yearly += amt;

      stats.categories[txn.category] = (stats.categories[txn.category] || 0) + amt;
    }

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Failed to generate stats" });
  }
};


// GET /api/transactions/summaries?type=monthly
export const getTransactionSummaries = async (req, res) => {
  try {
    const { type = "total" } = req.query;
    const userId = req.user._id;

    const { start, end } = getDateRange(type);

    const filter =
      type === "total"
        ? { user: userId }
        : { user: userId, dateTime: { $gte: start, $lte: end } };

    const summary = await Transaction.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(summary[0] || { total: 0, count: 0 });
  } catch (err) {
    res.status(500).json({ message: "Summary fetch failed" });
  }
};
