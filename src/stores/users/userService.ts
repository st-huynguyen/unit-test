import axios from 'axios';
import { endpoint } from '../../shared/constants';

// Get list users
const getListUsers = async () => {
  try {
    const res = await axios.get(endpoint);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Get user by id
const getUserById = async (userId: string) => {
  try {
    const res = await axios.get(`${endpoint}/${userId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Delete user by id
const deleteUserById = async (userId: string) => {
  try {
    const res = await axios.delete(`${endpoint}/${userId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

const userService = {
  getListUsers,
  getUserById,
  deleteUserById,
};

export default userService;
