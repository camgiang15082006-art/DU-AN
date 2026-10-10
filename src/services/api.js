import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Thay đổi URL backend của bạn nếu cần
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;