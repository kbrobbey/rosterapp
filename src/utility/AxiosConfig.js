import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://random-data-api.com/api/v2/'
});

export default AxiosInstance;
