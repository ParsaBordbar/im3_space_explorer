import axios from 'axios';

export const spaceApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
});
