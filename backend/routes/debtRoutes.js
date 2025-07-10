import express from 'express';
import {
  getAllDebtors,
  createDebtor,
  updateDebtor,
  deleteDebtor,
  getAllCreditors,
  createCreditor,
  updateCreditor,
  deleteCreditor,
} from '../controllers/debtController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Debtor Routes
router.get('/debtors', protect, getAllDebtors);
router.post('/debtor', protect, createDebtor); // ⬅️ Create new debtor
router.put('/debtor/:id', protect, updateDebtor);
router.delete('/debtor/:id', protect, deleteDebtor);

// Creditor Routes
router.get('/creditors', protect, getAllCreditors);
router.post('/creditor', protect, createCreditor); // ⬅️ Create new creditor
router.put('/creditor/:id', protect, updateCreditor);
router.delete('/creditor/:id', protect, deleteCreditor);

export default router;