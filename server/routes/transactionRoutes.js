import express from 'express';
import {
  createTransaction,
  getAllTransactions,
  deleteTransaction,
  getTransactionStats,
  getTransactionSummaries
} from '../controllers/transactionController.js';

import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// CREATE a new transaction
router.post('/', protect, createTransaction);

// GET all transactions with pagination
router.get('/', protect, getAllTransactions);

// DELETE a transaction
router.delete('/:id', protect, deleteTransaction);

// GET chart-friendly stats (e.g. for pie chart)
router.get('/stats', protect, getTransactionStats);

// GET daily, weekly, monthly, yearly, total summaries
router.get('/summaries', protect, getTransactionSummaries);


export default router;
