import API from './axios';

export const getTransactions = (params = {}) => {
  return API.get("/transactions", { params });
};

export const deleteTransaction = (id) => {
  return API.delete(`/transactions/${id}`);
};

export const createTransaction = async (transactionData) => {
  return await API.post('/transactions', transactionData); 
};

export const getTransactionStats = () => {
  return API.get("/transactions/stats");
};
