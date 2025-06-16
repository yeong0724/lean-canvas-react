import axios from 'axios';

function create(baseURL, options) {
  const instance = axios.create(Object.assign({ baseURL }), options);
  return instance;
}

export const instance = create('http://192.168.45.48:8000');
