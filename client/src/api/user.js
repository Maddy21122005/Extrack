import API from './axios';

export const getUserProfile = async () => {
  return await API.get('/auth/me', { withCredentials: true });
};

