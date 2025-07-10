import Debtor from '../models/debtor.js';
import Creditor from '../models/creditor.js';

// Debtor
// Create new debtor
export const createDebtor = async (req, res) => {
  try {
    const { name, amount } = req.body;
    const user = req.user._id;
    const exist = await Debtor.findOne({ name: name })
    if (!name || !amount) {
      return res.status(400).json({ message: 'Name and amount are required' });
    }

    const newDebtor = new Debtor({ user, name, amount });
    await newDebtor.save();

    res.status(201).json(newDebtor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create debtor', error: error.message });
  }
};

export const updateDebtor = async (req, res) => {
  const { id } = req.params;
  const { name, amount } = req.body;

  try {
    const debtor = await Debtor.findById(id);
    if (!debtor) return res.status(404).json({ message: 'Debtor not found' });

    // Optional: If debtor has a `userId`, validate it
    if (debtor.userId && debtor.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    debtor.name = name || debtor.name;
    debtor.amount = amount || debtor.amount;

    const updated = await debtor.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const deleteDebtor = async (req, res) => {
  const { id } = req.params;

  try {
    const debtor = await Debtor.findById(id);
    if (!debtor) return res.status(404).json({ message: 'Debtor not found' });

    if (debtor.userId && debtor.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    await debtor.deleteOne();
    res.status(200).json({ message: 'Debtor deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getAllDebtors = async (req, res) => {
  try {
    const debtors = await Debtor.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(debtors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user-specific debtors', error: error.message });
  }
};

// Creditor
// Create new creditor
export const createCreditor = async (req, res) => {
  try {
    const { name, amount } = req.body;
    const user = req.user._id;
    if (!name || !amount) {
      return res.status(400).json({ message: 'Name and amount are required' });
    }

    const newCreditor = new Creditor({ user, name, amount });
    await newCreditor.save();

    res.status(201).json(newCreditor);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create creditor', error: error.message });
  }
};

export const updateCreditor = async (req, res) => {
  const { id } = req.params;
  const { name, amount } = req.body;

  try {
    const creditor = await Creditor.findById(id);
    if (!creditor) return res.status(404).json({ message: 'Creditor not found' });

    if (creditor.userId && creditor.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    creditor.name = name || creditor.name;
    creditor.amount = amount || creditor.amount;

    const updated = await creditor.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const deleteCreditor = async (req, res) => {
  const { id } = req.params;

  try {
    const creditor = await Creditor.findById(id);
    if (!creditor) return res.status(404).json({ message: 'Creditor not found' });

    if (creditor.userId && creditor.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    await creditor.deleteOne();
    res.status(200).json({ message: 'Creditor deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getAllCreditors = async (req, res) => {
  try {
    const creditors = await Creditor.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(creditors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user-specific creditors', error: error.message });
  }
};