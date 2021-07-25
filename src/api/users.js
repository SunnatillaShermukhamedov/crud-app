import fetch from 'cross-fetch';
import { useQuery } from 'react-query';
import urls from '../config/urls';

export const getUsers = async () => {
  const res = await fetch(`${urls.apiUrl}/api/v1/users`);
  return res.json();
};

export const useUsers = () => {
  return useQuery('users', getUsers);
};
