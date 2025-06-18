import axios from 'axios';

function create(baseURL, options) {
  const instance = axios.create(Object.assign({ baseURL }), options);
  return instance;
}

console.log(import.meta.env.MODE);

export const instance = create(import.meta.env.VITE_API_BASE_URL);
// export const instance = create(
//   'https://json-server-vercel-nu-lyart.vercel.app',
// );
