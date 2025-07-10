import API from './axios';

// Create 
export const createDebtor = (data) => API.post('/debt/debtor', data);
export const createCreditor = (data) => API.post('/debt/creditor', data);

// Get All 
export const getDebtors = () => API.get('/debt/debtors');
export const getCreditors = () => API.get('/debt/creditors');

// Update
export const updateDebtor = (id, data) => API.put(`/debt/debtor/${id}`, data);
export const updateCreditor = (id, data) => API.put(`/debt/creditor/${id}`, data);

// Delete
export const deleteDebtor = (id) => API.delete(`/debt/debtor/${id}`);
export const deleteCreditor = (id) => API.delete(`/debt/creditor/${id}`);    
